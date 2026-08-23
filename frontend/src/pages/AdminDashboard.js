import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { categoryAPI, itemAPI, isLoggedIn } from '../services/api';

const getEmptyItem = () => ({
  name: '',
  mainImage: '',
  additionalImages: [''],
  description: '',
  category: '',
});

function AdminDashboard() {
  const [tab, setTab] = useState('items');
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [categoryName, setCategoryName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  const [itemForm, setItemForm] = useState(getEmptyItem());
  const [editItemId, setEditItemId] = useState(null);

  const loggedIn = isLoggedIn();

  const loadData = async () => {
    try {
      const [cats, allItems] = await Promise.all([
        categoryAPI.getAll(),
        itemAPI.getAll(),
      ]);
      setCategories(cats);
      setItems(allItems);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      loadData();
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return <Navigate to="/admin/login" />;
  }

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await categoryAPI.create(categoryName);
      setCategoryName('');
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await categoryAPI.update(editCategoryId, editCategoryName);
      setEditCategoryId(null);
      setEditCategoryName('');
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    setError('');

    try {
      await categoryAPI.remove(id);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleItemChange = (e) => {
    setItemForm({ ...itemForm, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, value) => {
    setItemForm((prev) => {
      const updated = [...prev.additionalImages];
      updated[index] = value;
      return { ...prev, additionalImages: updated };
    });
  };

  const addImageField = () => {
    setItemForm((prev) => ({
      ...prev,
      additionalImages: [...prev.additionalImages, ''],
    }));
  };

  const removeImageField = (index) => {
    setItemForm((prev) => {
      const updated = prev.additionalImages.filter((_, i) => i !== index);
      return {
        ...prev,
        additionalImages: updated.length ? updated : [''],
      };
    });
  };

  const resetItemForm = () => {
    setItemForm(getEmptyItem());
    setEditItemId(null);
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      name: itemForm.name,
      mainImage: itemForm.mainImage,
      description: itemForm.description,
      category: itemForm.category,
      additionalImages: itemForm.additionalImages.filter((img) => img.trim()),
    };

    try {
      if (editItemId) {
        await itemAPI.update(editItemId, payload);
      } else {
        await itemAPI.create(payload);
      }
      resetItemForm();
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditItem = (item) => {
    setEditItemId(item._id);
    setItemForm({
      name: item.name,
      mainImage: item.mainImage,
      description: item.description,
      category: item.category._id,
      additionalImages: item.additionalImages?.length
        ? [...item.additionalImages]
        : [''],
    });
    setTab('items');
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    setError('');

    try {
      await itemAPI.remove(id);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container dashboard">
      <h1>Admin Dashboard</h1>

      <div className="tabs">
        <button
          className={tab === 'items' ? 'tab active' : 'tab'}
          onClick={() => setTab('items')}
        >
          Items
        </button>
        <button
          className={tab === 'categories' ? 'tab active' : 'tab'}
          onClick={() => setTab('categories')}
        >
          Categories
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {tab === 'categories' && (
            <section className="panel">
              <h2>Manage Categories</h2>

              <form onSubmit={handleAddCategory} className="inline-form">
                <input
                  type="text"
                  placeholder="Category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
                <button type="submit">Add Category</button>
              </form>

              {editCategoryId && (
                <form onSubmit={handleUpdateCategory} className="inline-form">
                  <input
                    type="text"
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                    required
                  />
                  <button type="submit">Save</button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setEditCategoryId(null)}
                  >
                    Cancel
                  </button>
                </form>
              )}

              <ul className="simple-list">
                {categories.map((cat) => (
                  <li key={cat._id}>
                    <span>{cat.name}</span>
                    <div>
                      <button
                        onClick={() => {
                          setEditCategoryId(cat._id);
                          setEditCategoryName(cat.name);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => handleDeleteCategory(cat._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {categories.length === 0 && (
                <p className="empty-text">No categories yet. Add one above.</p>
              )}
            </section>
          )}

          {tab === 'items' && (
            <>
              <section className="panel">
                <h2>{editItemId ? 'Edit Item' : 'Add Item'}</h2>

                <form onSubmit={handleItemSubmit}>
                  <label>
                    Name
                    <input
                      name="name"
                      value={itemForm.name}
                      onChange={handleItemChange}
                      required
                    />
                  </label>

                  <label>
                    Main Image Link
                    <input
                      name="mainImage"
                      value={itemForm.mainImage}
                      onChange={handleItemChange}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </label>

                  <div className="image-group">
                    <label>Additional Images</label>
                    {itemForm.additionalImages.map((img, index) => (
                      <div key={`img-${index}`} className="image-row">
                        <input
                          type="text"
                          value={img}
                          placeholder="https://example.com/image.jpg"
                          onChange={(e) => handleImageChange(index, e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn-remove"
                          onClick={() => removeImageField(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn-add-image"
                      onClick={addImageField}
                    >
                      + Add Image Link
                    </button>
                  </div>

                  <label>
                    Description
                    <textarea
                      name="description"
                      value={itemForm.description}
                      onChange={handleItemChange}
                      rows="4"
                      required
                    />
                  </label>

                  <label>
                    Category
                    <select
                      name="category"
                      value={itemForm.category}
                      onChange={handleItemChange}
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className="form-actions">
                    <button type="submit">{editItemId ? 'Update Item' : 'Add Item'}</button>
                    {editItemId && (
                      <button type="button" className="btn-secondary" onClick={resetItemForm}>
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </section>

              <section className="panel">
                <h2>All Items</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Extra Images</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.category?.name}</td>
                        <td>{item.additionalImages?.length || 0}</td>
                        <td>
                          <button onClick={() => handleEditItem(item)}>Edit</button>
                          <button
                            className="btn-danger"
                            onClick={() => handleDeleteItem(item._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {items.length === 0 && (
                  <p className="empty-text">No items added yet.</p>
                )}
              </section>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default AdminDashboard;

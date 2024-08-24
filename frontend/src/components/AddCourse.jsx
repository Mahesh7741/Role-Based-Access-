import { useState } from 'react';
import './AddCourse.css';

function AddCourse() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [published, setPublished] = useState(true);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddCourse = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;

    setIsSubmitting(true); // Disable submit button

    try {
      // Handle form submission here
      console.log({ title, description, price, published, image });

      // Simulate an async operation (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset the form after submission
      setTitle("");
      setDescription("");
      setPrice("");
      setPublished(true);
      setImage(null);
      setIsPanelOpen(false); // Optionally close the panel after submission
      alert('Course added successfully!');
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course.');
    } finally {
      setIsSubmitting(false); // Re-enable submit button
    }
  };

  return (
    <div className="course-container">
      <button
        className={`add-course-button ${isPanelOpen ? 'open' : ''}`}
        onClick={() => setIsPanelOpen(!isPanelOpen)}
      >
        {isPanelOpen ? '×' : '+'}
      </button>

      {isPanelOpen && (
        <div className="slide-in-panel">
          <h2>Add Course</h2>
          <form onSubmit={handleAddCourse}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="form-group checkbox-group">
              <label htmlFor="published">
                <input
                  type="checkbox"
                  id="published"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
                <span>Published</span>
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="image">Course Image:</label>
              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting} // Disable button during submission
              className="submit-button"
            >
              {isSubmitting ? 'Adding...' : 'Add Course'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddCourse;

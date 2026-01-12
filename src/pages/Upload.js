import React, { useState } from "react";
import {
  FaUpload,
  FaFile,
  FaTag,
  FaDollarSign,
  FaInfoCircle,
} from "react-icons/fa";

const Upload = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "video",
    price: "",
    tags: "",
    file: null,
    previewImage: null,
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          alert("Preset uploaded successfully!");
          setFormData({
            title: "",
            description: "",
            category: "video",
            price: "",
            tags: "",
            file: null,
            previewImage: null,
          });
          setUploadProgress(0);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const categories = [
    { value: "video", label: "Video Presets" },
    { value: "audio", label: "Audio Presets" },
    { value: "photo", label: "Photo Presets" },
  ];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Upload Your Preset</h1>
        <p className="text-gray-600">
          Share your creative work with the community and start earning
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaUpload className="mr-2" />
            Preset File
          </h2>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-500 transition">
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleChange}
              className="hidden"
              accept=".zip,.rar,.7z"
              required
            />
            <label htmlFor="file" className="cursor-pointer">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <FaFile className="text-3xl text-primary-600" />
              </div>
              <p className="font-medium mb-2">
                Upload preset file (.zip, .rar, .7z)
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Max file size: 100MB • Supported formats: ZIP, RAR, 7Z
              </p>
              <button type="button" className="btn-secondary">
                Choose File
              </button>
            </label>
            {formData.file && (
              <p className="mt-4 text-sm text-gray-600">
                Selected: {formData.file.name}
              </p>
            )}
          </div>
        </div>

        {/* Preset Details */}
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaInfoCircle className="mr-2" />
            Preset Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Cinematic Color Grading Pack"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input-field min-h-[120px]"
                placeholder="Describe your preset in detail..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
                required
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center">
                <FaDollarSign className="mr-2" />
                Price (USD)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input-field"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 flex items-center">
                <FaTag className="mr-2" />
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., davinci, cinematic, color-grading"
              />
              <p className="text-sm text-gray-500 mt-2">
                Separate tags with commas. Helps users find your preset.
              </p>
            </div>
          </div>
        </div>

        {/* Preview Image */}
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4">Preview Image</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <input
              type="file"
              id="previewImage"
              name="previewImage"
              onChange={handleChange}
              className="hidden"
              accept="image/*"
            />
            <label htmlFor="previewImage" className="cursor-pointer">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                {formData.previewImage ? (
                  <img
                    src={URL.createObjectURL(formData.previewImage)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <FaFile className="text-3xl text-gray-400" />
                )}
              </div>
              <p className="font-medium mb-2">
                {formData.previewImage
                  ? "Change Preview Image"
                  : "Upload Preview Image"}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Recommended: 1200×800px • Max size: 5MB
              </p>
              <button type="button" className="btn-secondary">
                Choose Image
              </button>
            </label>
          </div>
        </div>

        {/* Submit Section */}
        <div className="card p-6 bg-primary-50 border-primary-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-bold text-lg mb-2">Ready to publish?</h3>
              <p className="text-gray-600">
                Review your preset details before submitting
              </p>
            </div>

            <div className="space-y-4 w-full md:w-auto">
              {isUploading && (
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                  <p className="text-sm text-center mt-1">
                    {uploadProgress}% uploaded
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isUploading}
                className={`w-full md:w-auto ${
                  isUploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <div className="btn-primary w-full md:w-auto px-8">
                  {isUploading ? "Uploading..." : "Publish Preset"}
                </div>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Upload;

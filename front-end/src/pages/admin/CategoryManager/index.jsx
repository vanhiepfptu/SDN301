import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../../Loading";
import "./CategoryManager.scss";

function CategoryManager() {
  const [nameV2, setNameV2] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [createdAt, setCreatedAt] = useState("");

  const [category, setCategory] = useState(""); // State to store the selected category
  const [subcategory, setSubcategory] = useState(""); // State to store the selected category

  const [categories, setCategories] = useState([]);
  const [loadingUpload, setLoadingUpload] = useState(true);
  const [showImgUpload, setShowImgUpload] = useState(null);
  const [showSubImgUpload, setShowSubImgUpload] = useState(null);

  const [subName, setSubName] = useState("");
  const [subImage, setSubImage] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // State to store the selected category

  const account = useSelector((state) => state.account);
  const [type, setType] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [createdCategory, setCreatedCategory] = useState(null);

  const [subcategories, setSubcategories] = useState([]);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [updateCategory, setUpdateCategory] = useState(null);
  const [updateSubcategory, setUpdateSubcategory] = useState(null);

  function getCategoryName(categoryId) {
    const foundCategory = categories.find(
      (category) => category._id === categoryId
    );
    return foundCategory ? foundCategory.name : "N/A";
  }

  // Add state to store the selected category for Subcategory
  const fetchSubcategories = async () => {
    try {
      const response = await axios.get("/api/subcategory/getAll");
      setSubcategories(response.data.data);
    } catch (error) {
      console.log("Error fetching subcategories:", error);
    }
  };
  useEffect(() => {
    fetchSubcategories();
  }, []);
  useEffect(() => {
    axios
      .get("/api/category/getAll")
      .then((response) => {
        setCategories(response.data.data); // Assuming your API returns an array of categories
      })
      .catch((error) => {
        console.error("Error fetching categories: ", error);
      });
  }, []);

  const handleAddSubcategory = () => {
    setOpenModal(true);
    setIsFormVisible(true);
  };

  const clearSubcategoryForm = () => {
    setName("");
    setImage(null);
    setDescription("");
    setCreatedAt("");
    // You may also clear the selected category
    setSelectedCategory(null);
    setIsFormVisible(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category/getAll");
      setCategories(response.data.data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFileUpload = (e) => {
    setImage(e.target.files[0]);
    setShowImgUpload(URL.createObjectURL(e.target.files[0]));
  };
  const handleSubFileUpload = (e) => {
    setSubImage(e.target.files[0]); // Update Subcategory image
    setShowSubImgUpload(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = () => {
    if (!name || !image) {
      toast.warning("Please fill in all fields.");
    } else {
      setLoadingUpload(false);
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "seafood");
      data.append("cloud_name", "dggciohw8");

      fetch("https://api.cloudinary.com/v1_1/dggciohw8/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const newCategory = {
            name: name,
            image: data.url,
          };

          axios
            .post("/api/category/create", newCategory, {
              headers: {
                Authorization: `Bearer ${account?.accessToken}`,
              },
            })
            .then((response) => {
              setName("");
              setImage(null);
              setLoadingUpload(true);
              setOpenModal(false);
              setIsFormVisible(false);
              setCreatedCategory(response.data);

              fetchCategories();

              toast.success(`Category ${name} created successfully!`);
            })
            .catch((err) => console.log("Error creating category:", err));
        })
        .catch((err) => console.log("Error uploading image:", err));
    }
  };
  const handleSubUpload = () => {
    // if (!subName || !subImage || !selectedCategory) {
    //   toast.warning("Please fill in all fields.");
    // } else {
    setLoadingUpload(false);
    const data = new FormData();
    data.append("file", subImage);
    data.append("upload_preset", "seafood");
    data.append("cloud_name", "dggciohw8");

    fetch("https://api.cloudinary.com/v1_1/dggciohw8/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        const newSubcategory = {
          name: "Pizza",
          image: data.url,
          description, // Add Subcategory description
          category: selectedCategory, // Add the selected category
        };
        axios
          .post(`/api/subcategory/create/${selectedCategory}`, newSubcategory, {
            headers: {
              Authorization: `Bearer ${account?.accessToken}`,
            },
          })
          .then((response) => {
            setSubName("");
            setSubImage(null);
            setDescription("");
            setLoadingUpload(true);
            setOpenModal(false);
            setIsFormVisible(false);
            setCreatedCategory(response.data);

            fetchSubcategories();

            toast.success(`Subcategory ${subName} created successfully!`);
          })
          .catch((err) => console.log("Error creating subcategory:", err));
      })
      .catch((err) => console.log("Error uploading image:", err));
    // }
  };
  const handleAddCategory = () => {
    setOpenModal(true);
    setIsFormVisible(true);
  };

  const hideForm = () => {
    setOpenModal(false);
    setIsFormVisible(false);
  };

  const showUpdateForm = (clickedCategory) => {
    if (isUpdateFormVisible && clickedCategory._id === updateCategory?._id) {
      // If the Update form is visible and the same category is clicked again, hide the form
      hideUpdateForm();
    } else {
      // Set the category to be updated
      setUpdateCategory(clickedCategory);
      setIsUpdateFormVisible(true);
    }
  };
  const showUpdateSubcategoryForm = (clickedSubcategory) => {
    if (
      isUpdateFormVisible &&
      clickedSubcategory._id === updateSubcategory?._id
    ) {
      // If the Update form is visible and the same subcategory is clicked again, hide the form
      hideUpdateForm();
    } else {
      // Set the subcategory to be updated
      setUpdateSubcategory(clickedSubcategory);
      setIsUpdateFormVisible(true);
    }
  };

  const hideUpdateForm = () => {
    // Clear the update form
    setUpdateCategory(null);
    setIsUpdateFormVisible(false);
  };

  const handleUpdateCategory = () => {
    if (!updateCategory) {
      return; // No category to update
    }

    // Create an updated category object with the changed name
    const updatedCategory = {
      ...updateCategory,
      name: updateCategory.name, // Replace 'updateCategory.name' with the new name
    };

    // Check if the category has a valid ID
    if (!updatedCategory._id) {
      console.log("Category ID is missing.");
      return;
    }

    // Check if a new image was selected for update
    if (image) {
      // Upload the new image to the server using a similar approach as in handleUpload for adding a category
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "seafood");
      data.append("cloud_name", "dggciohw8");

      fetch("https://api.cloudinary.com/v1_1/dggciohw8/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((imageData) => {
          // Update the category with the new image URL
          updatedCategory.image = imageData.url;

          // Send a PUT request to update the category
          axios
            .put(
              `/api/category/update/${updatedCategory._id}`,
              updatedCategory,
              {
                headers: {
                  Authorization: `Bearer ${account?.accessToken}`,
                },
              }
            )
            .then((response) => {
              // Update the category in the local state
              setCategories((prevCategories) =>
                prevCategories.map((category) =>
                  category._id === updatedCategory._id
                    ? updatedCategory
                    : category
                )
              );

              // Clear the update form
              hideUpdateForm();
              toast.success(
                `Category ${updatedCategory.name} updated successfully!`
              );
            })
            .catch((err) => {
              console.log("Error updating category:", err);
              // You may want to handle errors more gracefully here, e.g., display an error message to the user
            });
        })
        .catch((err) => console.log("Error uploading new image:", err));
    } else {
      // If no new image is selected, update the category without uploading a new image
      axios
        .put(`/api/category/update/${updatedCategory._id}`, updatedCategory, {
          headers: {
            Authorization: `Bearer ${account?.accessToken}`,
          },
        })
        .then((response) => {
          // Update the category in the local state
          setCategories((prevCategories) =>
            prevCategories.map((category) =>
              category._id === updatedCategory._id ? updatedCategory : category
            )
          );

          // Clear the update form
          hideUpdateForm();
          toast.success(
            `Category ${updatedCategory.name} updated successfully!`
          );
        })
        .catch((err) => {
          console.log("Error updating category:", err);
          // You may want to handle errors more gracefully here, e.g., display an error message to the user
        });
    }
  };
  const handleUpdateSubcategory = () => {
    if (!updateSubcategory) {
      return; // No subcategory to update
    }

    // Create an updated subcategory object with the changed name, image, and description
    const updatedSubcategory = {
      ...updateSubcategory,
      name: updateSubcategory.name, // Replace 'updateSubcategory.name' with the new name
      image: updateSubcategory.image, // Replace 'updateSubcategory.image' with the new image URL
      description: updateSubcategory.description, // Replace 'updateSubcategory.description' with the new description
    };

    // Check if the subcategory has a valid ID
    // if (!updatedSubcategory._id) {
    //   console.log("Subcategory ID is missing.");
    //   return;
    // }

    // Check if a new image was selected for update
    if (subImage) {
      // Upload the new image to the server using a similar approach as in handleSubUpload for adding a subcategory
      const data = new FormData();
      data.append("file", subImage);
      data.append("upload_preset", "seafood");
      data.append("cloud_name", "dggciohw8");

      fetch("https://api.cloudinary.com/v1_1/dggciohw8/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((imageData) => {
          // Update the subcategory with the new image URL
          updatedSubcategory.image = imageData.url;

          // Send a PUT request to update the subcategory
          axios
            .put(
              `/api/subcategory/update/${updatedSubcategory._id}`,
              updatedSubcategory,
              {
                headers: {
                  Authorization: `Bearer ${account?.accessToken}`,
                },
              }
            )
            .then((response) => {
              // Update the subcategory in the local state
              setSubcategories((prevSubcategories) =>
                prevSubcategories.map((subcategory) =>
                  subcategory._id === updatedSubcategory._id
                    ? updatedSubcategory
                    : subcategory
                )
              );

              // Clear the update form
              hideUpdateForm();
              toast.success(
                `Subcategory ${updatedSubcategory.name} updated successfully!`
              );
            })
            .catch((err) => {
              console.log("Error updating subcategory:", err);
              // You may want to handle errors more gracefully here, e.g., display an error message to the user
            });
        })
        .catch((err) => console.log("Error uploading new image:", err));
    } else {
      // If no new image is selected, update the subcategory without uploading a new image
      axios
        .put(
          `/api/subcategory/update/${updatedSubcategory._id}`,
          updatedSubcategory,
          {
            headers: {
              Authorization: `Bearer ${account?.accessToken}`,
            },
          }
        )
        .then((response) => {
          // Update the subcategory in the local state
          setSubcategories((prevSubcategories) =>
            prevSubcategories.map((subcategory) =>
              subcategory._id === updatedSubcategory._id
                ? updatedSubcategory
                : subcategory
            )
          );

          // Clear the update form
          hideUpdateForm();
          toast.success(
            `Subcategory ${updatedSubcategory.name} updated successfully!`
          );
        })
        .catch((err) => {
          console.log("Error updating subcategory:", err);
          // You may want to handle errors more gracefully here, e.g., display an error message to the user
        });
    }
  };
  return (
    <div className="categoryManager">
      <div className="categories">
        <h3 className="categoriesTitle">Categories</h3>
        <button onClick={isFormVisible ? hideForm : handleAddCategory}>
          {isFormVisible ? "Cancel" : "Add Category"}
        </button>

        <div className={`selectedCategory${openModal ? " open" : ""}`}>
          {isFormVisible && (
            <div className="uploadContain">
              <h3 className="uploadTitle">Create Category</h3>
              <div className="uploadContent">
                <div className="inputBox">
                  <label htmlFor="inputName">Name</label>
                  <input
                    type="text"
                    className="inputName"
                    id="inputName"
                    placeholder="Enter Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="inputBox">
                  <label htmlFor="inputImage">Image</label>
                  <input
                    type="file"
                    className="inputImg"
                    onChange={handleFileUpload}
                  />
                </div>
                <div className="inputBox">
                  {showImgUpload && (
                    <img
                      src={showSubImgUpload}
                      alt="Selected Image"
                      width="100%"
                    />
                  )}
                </div>
                <div className="submitForm">
                  <button className="uploadBtn" onClick={handleUpload}>
                    Create Category
                  </button>
                </div>
              </div>
            </div>
          )}

          {isUpdateFormVisible && (
            <div className="uploadContain">
              <h3 className="uploadTitle">Update Category</h3>
              <div className="uploadContent">
                <div className="inputBox">
                  <label htmlFor="updateName">Name</label>
                  <input
                    type="text"
                    className="inputName"
                    id="updateName"
                    placeholder="Enter Updated Category Name"
                    value={updateCategory && updateCategory.name}
                    // Display the updated name
                    onChange={(e) => {
                      // setUpdateCategory({
                      //   ...updateCategory,
                      //   name: e.target.value,
                      // });
                      setNameV2(e.target.value);
                      console.log(e.target.value);
                    }}
                  />
                </div>
                <div className="inputBox">
                  <label htmlFor="updateImage">Image</label>
                  <input
                    type="file"
                    className="inputImg"
                    onChange={(e) => {
                      const updatedImage = e.target.files[0];
                      setUpdateCategory({
                        ...updateCategory,
                        image: updatedImage,
                      });
                    }}
                  />
                </div>

                <div className="inputBox">
                  {updateCategory.image && (
                    <img
                      src={updateCategory.image}
                      alt="Selected Image"
                      width="100%"
                    />
                  )}
                </div>
                <div className="submitForm">
                  <button className="uploadBtn" onClick={handleUpdateCategory}>
                    Update Category
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>
                  {category._id === updateCategory?._id
                    ? updateCategory.name
                    : category.name}
                </td>
                <td>
                  <img
                    src={
                      category._id === updateCategory?._id
                        ? updateCategory.image
                        : category.image
                    }
                    alt={category.name}
                    width="100"
                  />
                </td>
                <td>{new Date(category.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => showUpdateForm(category)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="subcategories">
        <h3 className="subcategoriesTitle">Subcategories</h3>
        <button onClick={isFormVisible ? hideForm : handleAddSubcategory}>
          {isFormVisible ? "Cancel" : "Add SubCategory"}
        </button>
        <div className={`selectedSubcategory${openModal ? " open" : ""}`}>
          {isFormVisible && (
            <div className="uploadContain">
              <h3 className="uploadTitle">Create Subcategory</h3>
              <div className="uploadContent">
                <div className="inputBox">
                  <label htmlFor="inputName">Name</label>
                  <input
                    type="text"
                    className="inputName"
                    id="updateName"
                    placeholder="Enter Updated Subcategory Name"
                    value={updateSubcategory ? updateSubcategory.name : ""}
                    onChange={(e) => {
                      setUpdateSubcategory({
                        ...updateSubcategory,
                        name: e.target.value,
                      });
                      console.log(e.target.value);
                    }}
                  />

                  <div className="inputBox">
                    <label htmlFor="inputImage">Image</label>
                    <input
                      type="file"
                      className="inputImg"
                      onChange={(e) => {
                        const updatedImage = e.target.files[0];
                        setSubImage(updatedImage);
                      }}
                    />
                  </div>
                  <div className="inputBox">
                    {subImage && (
                      <img
                        src={URL.createObjectURL(subImage)}
                        alt="Selected Image"
                        width="100%"
                      />
                    )}
                  </div>
                  <div className="inputBox">
                    <label htmlFor="inputName">Description</label>
                    <input
                      type="text"
                      className="inputDescription"
                      id="updateDescription"
                      placeholder="Enter Updated Description"
                      value={
                        updateSubcategory ? updateSubcategory.description : ""
                      }
                      onChange={(e) => {
                        setUpdateSubcategory({
                          ...updateSubcategory,
                          description: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="inputBox">
                    <label htmlFor="categoryDropdown">Category</label>
                    <select
                      id="categoryDropdown"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="submitForm">
                    <button onClick={() => handleSubUpload()}>
                      Update Subcategory
                    </button>{" "}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hiển thị danh sách Subcategories */}
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subcategories.map((subcategory) => (
                <tr key={subcategory._id}>
                  <td>
                    {updateSubcategory &&
                    updateSubcategory._id === subcategory._id
                      ? updateSubcategory.name
                      : subcategory.name}
                  </td>
                  <td>
                    <img
                      src={
                        updateSubcategory &&
                        updateSubcategory._id === subcategory._id
                          ? updateSubcategory.image
                          : subcategory.image
                      }
                      alt={subcategory.name}
                      width="100"
                    />
                  </td>
                  <td>{subcategory.description}</td>
                  <td>
                    {new Date(subcategory.createdAt).toLocaleDateString()}
                  </td>
                  <td>{getCategoryName(subcategory.category)}</td>
                  <td>
                    <button
                      onClick={() => showUpdateSubcategoryForm(subcategory)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CategoryManager;

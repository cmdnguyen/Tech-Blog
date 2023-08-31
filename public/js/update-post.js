// Update Post function
const updatePost = async (id) => {
  // Takes the value of the update title and contents
  const title = document.querySelector("#update-title").value;
  const contents = document.querySelector("#update-contents").value;
  // Alerts the user to have title and contents if empty
  if (!title && !contents) {
    alert("Must have title and contents");
    return;
  }
  // Sends the values to the database through the PUT method and update the data
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, contents }),
  });
  // Reloads the page if successful
  if (response.ok) {
    location.reload();
  } else {
    console.log("Error ");
  }
};
// Delete Post function
const deletePost = async (id) => {
  try {
    // DELETE method to remove the post from the database
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Sends the user to the dashboard if successful
    if (response.ok) {
      window.location.href = "/dashboard";
    } else {
      console.log("Error");
    }
  } catch (err) {
    console.log(err);
  }
};
// Event listener for update post button in the update post form
document.getElementById("update-button").addEventListener("click", function (event) {
    // Get the post ID from the data attribute of the clicked button
    const postId = event.target.dataset.postId;
    if (postId) {
      updatePost(postId);
    } else {
      console.log("Post ID not found.");
    }
  });
//Event listener for delete button in the post the user created
document.getElementById("delete-button").addEventListener("click", function (event) {
    // Get the post ID from the data attribute of the clicked button
    const postId = event.target.dataset.postId;
    // Asks the user to confirm
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    // If confirmed, delete the post assoociated with the id
    if (confirmDelete) {
      deletePost(postId);
    } else {
      console.log("Post ID not found.");
    }
  });

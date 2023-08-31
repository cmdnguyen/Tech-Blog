const updatePost = async (id) => {
    // Takes the value of the edited title and contentd
    const title = document.querySelector('#update-title').value;
    const contents = document.querySelector('#update-contents').value;
    
    if (!title && !contents){
        alert('Must have title and content');
        return;
    }


    const response = await fetch(`/api/posts/${id}` , {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({title, contents}),
    })

    if (response.ok){
        location.reload()
    } else{
        console.log("Error ")
    }
}

const deletePost = async (id) => {
try {
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        if (response.ok){
            window.location.href = "/dashboard"
        } else {
            console.log("Error")
        }
} catch (err) {
    console.log(err)
}
}

document.getElementById("update-button").addEventListener("click", function(event){
    const postId = event.target.dataset.postId
    console.log("checking post id")
    console.log(postId)
    if (postId){
        updatePost(postId)
    } else {
        console.log("Post ID not found.")
    }
})
document.getElementById("delete-button").addEventListener("click", function(event){
    // Get the post ID from the data attribute of the clicked button
    const postId = event.target.dataset.postId;
    // Asks the user to confirm
    const confirmDelete = confirm("Are you sure you want to delete this post?") 
    // If confirmed, delete the post assoociated with the id
    if (confirmDelete) {
        deletePost(postId);
    } else {
        console.log("Post ID not found.");
    }
})
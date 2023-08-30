const updatePost = async (id) => {

    const title = document.querySelector('#update-title').value;
    const contents = document.querySelector('#update-contents').value;


    console.log(title)
    console.log(contents)    
    if (!title && !contents){
        alert('Must have title and content');
        return;
    }

    console.log("Before fetch")
    const response = await fetch(`/api/posts/${id}` , {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({title, contents}),
    })

    console.log(response)

    if (response.ok){
        window.location.href = "/dashboard"
    } else{
        console.log("Error ")
    }
}

const deletePost = async (id) => {
try {
        console.log("post id:" + id)
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
    if (postId){
        updatePost(postId)
    } else {
        console.log("Post ID not found.")
    }
})
document.getElementById("delete-button").addEventListener("click", function(event){
    // Get the post ID from the data attribute of the clicked button
    const postId = event.target.dataset.postId;

    // Check if a post ID was found
    if (postId) {
        // Call deletePost with the post ID
        deletePost(postId);
    } else {
        console.log("Post ID not found.");
    }
})
console.log("adding comment")

const createNewPost = async (event) => {
    event.preventDefault()


    const comment = document.querySelector('#comment').value;

    if (!comment){
        alert('Must have comment');
        return;
    }
    console.log("Before fetch")
    const response = await fetch('/api/comments' , {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({comment}),
    })

    console.log(response)

    if (response.ok){
        document.location.reload()
    } else{
        console.log("Error ")
    }
}

document.getElementById("comment-submit").addEventListener("click", createNewPost)
console.log("Event listener triggered");
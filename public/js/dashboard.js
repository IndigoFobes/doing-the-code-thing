const newPost = async () => {
    const response = await fetch('api/blogs/', {
        method: 'POST',

    })
}

const newPostForm = async () => {
console.log("let's make a new blog post!")
}

document.querySelector('#new-post').addEventListener('click', newPostForm);
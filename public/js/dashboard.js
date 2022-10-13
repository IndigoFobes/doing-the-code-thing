// to delete a post
const deletePost = async (event) => {

    //alert('button clicked');
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            //alert('deleted post')
            document.location.replace('/dashboard'); // refresh page
          } else {
            alert('Failed to delete blog post');
          }
    }
}

// delete post button
document.querySelector('.blog-list').addEventListener('click', deletePost);
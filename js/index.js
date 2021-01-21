let like = true 

document.addEventListener("DOMContentLoaded", () => {
    fetchBooks()
});

const fetchBooks = () => {
    fetch('http://localhost:3000/books')
        .then(resp => resp.json())
        .then(books => books.forEach(renderBook))
}

const renderBook = (book) => {
    const bookListContainer = document.getElementById("list")

    let li = document.createElement('li')
        li.innerText = book.title
        li.addEventListener('click', () => renderBookInfo(book))

    bookListContainer.appendChild(li)
}

const renderBookInfo = (book) => {
    let bookInfoContainer = document.getElementById("show-panel")
        bookInfoContainer.innerText = ""

    let img = document.createElement('img')
        img.src = book.img_url

    let title = document.createElement('h4')
        title.innerText = book.title 

    let subtitle = document.createElement('h4')
        subtitle.innerText = book.subtitle

    let author = document.createElement('h4')
        author.innerText = book.author

    let description = document.createElement('p')
        description.innerText = book.description

    let ul = document.createElement('ul')

    book.users.forEach(user => {
        let li = document.createElement('li')
            li.innerText = user.username
        ul.append(li)
    })

    let button = document.createElement('button')
        like? button.innerText = "LIKE" : button.innerText = "UNLIKE"
        button.addEventListener('click', () => likeBook(book, button))

    bookInfoContainer.append(img, title, subtitle, author, description, ul, button)
}

const likeBook = (book, button) => {
    let toPatch

    if (like) {
        const currentUser = {"id":1, "username":"pouros"}
        book.users.push(currentUser)
        toPatch = {"users": book.users}
        like = false
    } else {
        like = true
        book.users.pop()
        toPatch = {"users": book.users}
    }


    const reqPack = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(toPatch)
    }

    fetch(`http://localhost:3000/books/${book.id}`, reqPack)
        .then(resp => resp.json())
        .then(book => renderBookInfo(book))
}
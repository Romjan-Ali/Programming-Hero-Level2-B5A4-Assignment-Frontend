import { useParams } from 'react-router-dom'

const mockAuthor = {
  id: 'amy-stevens',
  name: 'Amy Stevens',
  role: 'Author',
  image:
    'https://booklovers.ancorathemes.com/wp-content/uploads/2020/05/team1-copyright-570x741.jpg',
  bio: `Amy Stevens is a renowned author known for her compelling storytelling and deeply emotional characters. With over a decade of writing experience, Amy continues to inspire readers around the world.`,
  books: [
    {
      title: 'Echoes of the Past',
      cover:
        'https://booklovers.ancorathemes.com/wp-content/uploads/2020/05/book11-copyright.jpg',
    },
    {
      title: 'Shadows of Tomorrow',
      cover:
        'https://booklovers.ancorathemes.com/wp-content/uploads/2020/05/book5-copyright.jpg',
    },
  ],
}

const Author = () => {
  const { authorId } = useParams()

  // In a real app, you’d fetch author data using authorId

  const author = mockAuthor

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={author.image}
          alt={author.name}
          className="w-full md:w-64 rounded shadow"
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-3xl font-bold">{author.name}</h2>
          <p className="text-fuchsia-600 font-medium">{author.role}</p>
          <p className="text-gray-700">{author.bio}</p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Books by {author.name}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {author.books.map((book, idx) => (
            <div key={idx} className="text-center">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-48 object-cover rounded shadow"
              />
              <div className="mt-2 text-sm font-semibold">{book.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Author

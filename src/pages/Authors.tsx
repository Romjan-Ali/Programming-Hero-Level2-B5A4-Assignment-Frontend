import { Link } from 'react-router-dom'

type Author = {
  name: string
  role: string
  image: string
}

const authors: Author[] = [
  {
    name: 'Amy Stevens',
    role: 'Author',
    image:
      'https://booklovers.ancorathemes.com/wp-content/uploads/2020/05/team1-copyright-570x741.jpg',
  },
  {
    name: 'John Mason',
    role: 'Author',
    image:
      'https://booklovers.ancorathemes.com/wp-content/uploads/2020/05/team2-copyright-570x741.jpg',
  },
  {
    name: 'Emily Rose',
    role: 'Poet',
    image:
      'https://booklovers.ancorathemes.com/wp-content/uploads/2020/05/team3-copyright-570x741.jpg',
  },
  {
    name: 'Oliver Stone',
    role: 'Novelist',
    image:
      'https://booklovers.ancorathemes.com/wp-content/uploads/2020/05/team4-copyright-570x741.jpg',
  },
]

const Authors = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Meet Our Authors</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {authors.map((author, index) => (
          <Link
            to=""
            key={index}
            className="card flex flex-col items-start space-y-2 hover:shadow-lg transition bg-white p-2 rounded"
          >
            <img
              src={author.image}
              alt={author.name}
              className="w-full rounded"
            />
            <div className="text-lg font-bold text-left">{author.name}</div>
            <div className="text-sm text-left text-gray-600">{author.role}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Authors

import { useSelector } from 'react-redux'

export default function Profile() {
  const { user } = useSelector((state) => state.auth)

  if (!user) return <p>Chargement du profil...</p>

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Bienvenue {user.firstName} {user.lastName}
        </h1>
        <p>Pseudo : {user.userName}</p>
      </div>
    </main>
  )
}

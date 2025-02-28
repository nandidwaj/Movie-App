import { useState,useEffect } from 'react'
import { searchMovies,getPopularMovies } from '../services/api.js';
import Moviecard from '../components/MovieCard.jsx'
import '../styles/Home.css'
function Home() {
    const [searchQuery,setSearchQuery] = useState("");
    const [movies,setMovies] = useState([])
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try{
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err){
                setError("Failed to load Movies.....")
            }
            finally{
                setLoading(false)
            }
        }

        loadPopularMovies()
    },[])
    const handleSearch = async (e) =>{
        e.preventDefault()
        if (!searchQuery.trim()) return
        if(loading) return

        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch(err){
            console.log(err)
            setError("Failed to search...")
        } finally{
            setLoading(false)
        }
        setSearchQuery("")
    }
  return (
    <>
    <div className='home'>
        <form onSubmit={handleSearch} className='search-form'>
            <input type='text' placeholder='Enter movie name...' className='search-input'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}/>
            <button typr="submit" className='search-button'>Search</button>
        </form>

        {error && <div className='error-message'>{error}</div>}

        {loading ? 
        (<div className='loading'></div>
        ):(
        <div className='movies-grid'>
            {movies.map((movie) => (
                <Moviecard movie={movie} key={movie.id} />
            ))}    
        </div>
         )}
    </div>
    </>
  )
}
export default Home
import React, { useState } from 'react'

const MovieCard = ({ movie: { id, title, vote_average, poster_path, release_date, original_language } }) => {
    const [playing, setPlaying] = useState(false);

    const handlePlay = () => {
        setPlaying(true);
    }

    return (
        <>
            {!playing ? (
                <div onClick={handlePlay} className='movie-card'>
                    {/* <p key={id} className='text-white'>{title}</p> */}
                    <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} alt={title} />

                    <div className='mt-4'>
                        <h3>{title}</h3>

                        <div className="content">
                            <div className="rating">
                                <img src="star.svg" alt="Star Icon" />
                                <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                            </div>

                            <span>•</span>
                            {/* from sumbolsDB.com  */}
                            <p className='lang'> {original_language} </p>

                            <span>•</span>
                            <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <iframe
                    width="100%"
                    height="400"
                    src="https://www.youtube.com/embed/VrVzpEJgtqY?autoplay=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>

            )}
        </>
    )
}

export default MovieCard

// 🔧 What You Should Do
// ✅ If you're using YouTube: embed with <iframe>

// ✅ If hosting your own .mp4 file: use the <video> tag with direct file link

// ❌ Don’t use YouTube short links (youtu.be) in <video> tags

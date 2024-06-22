// import React, { useState, useEffect } from 'react';

// const PhotosList = () => {
//   const [photos, setPhotos] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPhotos = async () => {
//       try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/photos');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setPhotos(data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchPhotos();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Photos List</h1>
//       <ul>
//         {photos.slice(0, 10).map(photo => (
//           <li key={photo.id}>
//             <h2>{photo.title}</h2>
//             <img src={photo.thumbnailUrl} alt={photo.title} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PhotosList;

import React, { useState, useEffect } from 'react';

const RandomImage = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchRandomImages = async () => {
      try {
        const urls = [];
        for (let i = 0; i < 60; i++) { // Fetching 60 images
          const response = await fetch(`https://picsum.photos/200/300?random=${i}`);
          urls.push(response.url);
        }
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching the images:', error);
      }
    };

    fetchRandomImages();
  }, []);

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value.toLowerCase());
  };

  const filteredImages = imageUrls.filter(url =>
    url.includes(searchKeyword)
  );

  return (
    <div>
      <h1>Random Images</h1>
      <input
        type="text"
        placeholder="Search images by keyword"
        value={searchKeyword}
        onChange={handleSearch}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredImages.length > 0 ? (
          filteredImages.map((url, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <img
                src={url}
                alt={`Random ${index}`}
                style={{ width: '200px', height: '300px', margin: '10px' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0, 0, 0, 0.5)',
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={() => { // Show on hover
                  document.getElementById(`overlay${index}`).style.display = 'flex';
                }}
                onMouseLeave={() => { // Hide on mouse leave
                  document.getElementById(`overlay${index}`).style.display = 'none';
                }}
                id={`overlay${index}`}
              >
                <p style={{ color: 'white', fontSize: '20px' }}>Image {index + 1}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No images found.</p>
        )}
      </div>
    </div>
  );
};

export default RandomImage;






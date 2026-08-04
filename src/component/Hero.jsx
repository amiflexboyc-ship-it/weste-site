import React from 'react'

const Hero = () => {
  const animals = [
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ1sXNR3fWq5aNs7LT1t8Y9vf_Fu07Xo_-8-MyvcnQ8mTghr1JvLJkYdU&s=10',
      name: 'The beauty dog in bush',
      price: '200$',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIkKcltk0Er-AlnwLP8ZcbyMj8qrs4oIbCnCibaOeRtQ&s=10',
      name: 'The beauty cat in town',
      price: '200$',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZHVSZ5P8hirsG3xAb9lzu93q18Mz3qPmZp7cpcdle9g&s=10',
      name: 'The beauty elephant in town',
      price: '200$',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4F604p_ZtCypXOf-QrXFabqntUq2g3VHM4An7UHHaxg&s=10',
      name: 'The beauty gorilla in town',
      price: '200$',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpMPPEBJbKNARIO8mtSkZZZt6j4btWOiFtSXzKtEt2UQ&s=10',
      name: 'The beauty goat in town',
      price: '200$',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHhOteFzFpz9phePIrIvv8dPTFp8KgTSbkUtNlw6MWg&s=10',
      name: 'The beauty lion in the bush',
      price: '200$',
    },
  ]

  return (
    <div className="w-full bg-slate-900">
      <div className="px-2 text-center text-white py-20 flex flex-col items-center justify-center">
        <p className="text-indigo-500 font-medium">Get updated</p>
        <h1 className="max-w-lg font-semibold text-4xl/[44px] mt-2">
          Search for animals...
        </h1>

        <div className="flex items-center justify-center mt-10 border border-slate-600sm rounded-full h-14 max-w-md w-full">
          <input
            type="text"
            className="bg-transparent outline-none rounded-full px-4 h-full flex-1"
            placeholder="search for animals"
          />
          <button className="bg-indigo-800 text-white rounded-full h-11 mr-1 px-8 flex items-center justify-center">
            Send now
          </button>
        </div>
      </div>

      <div className="w-full text-white text-center px-4 py-10">
        <h3 className="mb-6 mt-4 font-serif text-white">GET YOUR FAVORITY ANIMAS</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto ">
          {animals.map((animal, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center rounded-2xl p-4 h-full"
            >
              <img
                src={animal.img}
                alt={animal.name}
                className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-2 sm:text-4xl npm md:text-5xlborder-white/40"
              />

              <p className="mt-4 font-light">{animal.name}</p>
              <h4 className="mt-1 mb-4">price: {animal.price}</h4>

              <button className="mt-auto bg-indigo-600 text-white py-2 px-4 rounded-full">
                buy more
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero;
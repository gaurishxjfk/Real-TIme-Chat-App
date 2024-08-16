

const ChatMediaModal = ({selectedFile}: {selectedFile: string}) => {
  return (
    <div className="h-[80vh] inset-0 bg-black w-full bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg">
      <div className="flex justify-end">
        <button  className="text-gray-500">
          &times;
        </button>
      </div>
      <div className="mt-2">
        {selectedFile && (
          <div>
            {selectedFile.includes('video') ? (
              <video
                src={selectedFile}
                controls
                className="max-w-full max-h-64"
              />
            ) : (
              <img
                src={selectedFile}
                alt="Selected"
                className="max-w-full max-h-64"
              />
            )}
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  )
}

export default ChatMediaModal
import logo from '@static/images/sky.gif'

const FullScreenLoading = () => {
  return (
    <div className='loading fixed sm:static w-screen h-screen flex justify-center items-center bg-white dark:bg-[color:var(--primary-dark)] z-[100]'>
      <img
        className='h-32'
        src={logo}
        alt="main logo" />
    </div>
  )
}

export default FullScreenLoading

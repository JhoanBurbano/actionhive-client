import './App.scss'
import { Outlet} from 'react-router-dom'
import TopBar from './components/TopBar/TopBar'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { useEffect } from 'react'
import { setIsMobile } from './redux/slices/ui.slice'
import { Loader } from './components'

function App() {
  const {fullTemplate, overflow, isWhiteBackground, loader} = useSelector((state: RootState)=>state.ui)
  const dispatch = useDispatch()


  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth <= 850))
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className='viewport'>
      {
        loader && <Loader/>
      }
      <TopBar/>
      <main className='viewport__content' style={{
        overflowY: overflow ? 'unset' : 'hidden',
        padding: fullTemplate ? '0px' : '20px',
        background: isWhiteBackground ? 'white' : 'linear-gradient(to top, #33aa55, #61f179)'
      }}>
      <Outlet></Outlet>
      </main>
    </div>
  )
}

export default App

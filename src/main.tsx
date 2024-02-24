import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import './index.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Access, Landing, Dashboard, CreateProject } from './views/index.ts'
import { store } from './redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<App/>}>
      <Route index element={<Landing/>} />
      <Route path='login' element={<Access isLogin={true}/>} />
      <Route path='register' element={<Access isLogin={false}/>} />
      <Route path='dashboard-user' element={<Dashboard type={'user'}/>} />
      <Route path='dashboard-inversor' element={<Dashboard type={'inversor'}/>} />
      <Route path='create-project' element={<CreateProject />} />
    </Route>
  </Routes>
</BrowserRouter>
  </Provider>

)

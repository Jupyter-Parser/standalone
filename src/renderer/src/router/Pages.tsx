import { Suspense } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { multiLazy } from '../utils/multyLazy'
import RoutePaths from './Routes'
import { DraggableTopBar } from '@renderer/components/DraggableTopBar'

const AppRouter = () => {
  const [HomePage] = multiLazy([() => import('../pages/HomePage')])

  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <DraggableTopBar />
              <Outlet />
            </>
          }
        >
          <Route path={RoutePaths.HOME} element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRouter

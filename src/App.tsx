import React, { Suspense, lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import './index.scss';
import Navbar from './components/Navbar';

// Lazy-load components for better performance
const ErrorBoundary = lazy(() => import('./pages/ErrorBoundary'));
const Home = lazy(() => import('./pages/Home'));
const Orders = lazy(() => import('./pages/Orders'));
const Users = lazy(() => import('./pages/Users'));
const AddProduct = lazy(() => import('./components/AddProduct'));
const ReturnRequested = lazy(() => import('./components/ReturnRequested'));
const UserDetails = lazy(() => import('./components/UserDetails'));
const Product = lazy(() => import('./pages/Products'));

const App = () => (
  <Suspense fallback={<div>Loading Application...</div>}>
    <Navbar />
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route
          index
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading Home...</div>}>
                <Home />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path="/product"
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading Products...</div>}>
                <Product />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path="/order"
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading Orders...</div>}>
                <Orders />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path="/user"
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading Users...</div>}>
                <Users />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path="/add-product"
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading Add Product...</div>}>
                <AddProduct />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path="/return-request"
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading Return Requested...</div>}>
                <ReturnRequested />
              </Suspense>
            </ErrorBoundary>
          }
        />
        <Route
          path="/userDetails/:id"
          element={
            <ErrorBoundary>
              <Suspense fallback={<div>Loading User Details...</div>}>
                <UserDetails />
              </Suspense>
            </ErrorBoundary>
          }
        />
      </Route>
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  </Suspense>
);

export default App;


























// import React, { Suspense, lazy } from 'react';
// import { Outlet, Route, Routes } from 'react-router-dom';
// import './index.scss';
// import Navbar from './components/Navbar';

// // Lazy-load components for better performance
// const ErrorBoundary = lazy(() => import('./pages/ErrorBoundary'));
// const Home = lazy(() => import('./pages/Home'));
// const Orders = lazy(() => import('./pages/Orders'));
// const Users = lazy(() => import('./pages/Users'));
// const AddProduct = lazy(() => import('./components/AddProduct'));
// const ReturnRequested = lazy(() => import('./components/ReturnRequested'));
// const UserDetails = lazy(() => import('./components/UserDetails'));
// const Product = lazy(() => import('./pages/Products'));

// const App = () => (
//   <Suspense fallback={<div>Loading Application...</div>}>
//     <ErrorBoundary>
//       <Routes>
//         <Route path="/" element={<><Navbar /> <Outlet /></>}>
//           <Route
//             index
//             element={
//               <Suspense fallback={<div>Loading Home...</div>}>
//                 <Home />
//               </Suspense>
//             }
//           />
//           <Route
//             path="/product"
//             element={
//               <Suspense fallback={<div>Loading Products...</div>}>
//                 <Product />
//               </Suspense>
//             }
//           />
//           <Route
//             path="/order"
//             element={
//               <Suspense fallback={<div>Loading Orders...</div>}>
//                 <Orders />
//               </Suspense>
//             }
//           />
//           <Route
//             path="/user"
//             element={
//               <Suspense fallback={<div>Loading Users...</div>}>
//                 <Users />
//               </Suspense>
//             }
//           />
//           <Route
//             path="/add-product"
//             element={
//               <Suspense fallback={<div>Loading Add Product...</div>}>
//                 <AddProduct />
//               </Suspense>
//             }
//           />
//           <Route
//             path="/return-request"
//             element={
//               <Suspense fallback={<div>Loading Return Requested...</div>}>
//                 <ReturnRequested />
//               </Suspense>
//             }
//           />
//           <Route
//             path="/userDetails/:id"
//             element={
//               <Suspense fallback={<div>Loading User Details...</div>}>
//                 <UserDetails />
//               </Suspense>
//             }
//           />
//         </Route>
//         <Route path="*" element={<h1>Page Not Found</h1>} />
//       </Routes>
//     </ErrorBoundary>
//   </Suspense>
// );

// export default App;
































// import React from 'react'
// import { Outlet, Route, Routes } from 'react-router-dom'
// import "./index.scss"
// import ErrorBoundary from './pages/ErrorBoundary'
// import Home from './pages/Home'
// import Orders from './pages/Orders'
// import Users from './pages/Users'
// import AddProduct from './components/AddProduct'
// import ReturnRequested from './components/ReturnRequested'
// import UserDetails from './components/UserDetails'
// import Navbar from './components/Navbar'

// import Product from './pages/Products'

// const App = () => (
//   <>
//     <ErrorBoundary>
//       <Routes>
//         <Route path='/' element={<> <Navbar /> <Outlet /></>}>
//           <Route index element={<Home />} />
//           <Route path='/product' element={<Product />} />
//           <Route path='/order' element={<Orders />} />
//           <Route path='/user' element={<Users />} />
//           <Route path='/add-product' element={<AddProduct />} />
//           <Route path='/return-request' element={<ReturnRequested />} />
//           <Route path='/userDetails/:id' element={<UserDetails />} />
//         </Route>
//         <Route path='*' element={<h1>Page Not Found</h1>} />
//       </Routes>
//     </ErrorBoundary>
//   </>
// )
// export default App
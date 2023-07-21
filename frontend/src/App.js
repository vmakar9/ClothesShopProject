import Clothes from "./components/Clothes/Clothes";
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ClothesDetails from "./components/ClothesDetails/ClothesDetails";


function App() {
  return (
    <div>
       <Routes>
           <Route path="/" element={<Layout />}>
               <Route index element={<Navigate to="/clothes" />} />
               <Route path="/clothes" element={<Clothes />} />
               <Route path="/clothes/:id" element={<ClothesDetails />} />
           </Route>
       </Routes>
    </div>
  );
}

export default App;

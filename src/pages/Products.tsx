import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    useActivateProductMutation,
    useDeactivateProductMutation,
    useAdminGetAllProductsQuery,
    useAdminUpdateProductMutation,
    useAdminDeleteProductMutation,
} from '../redux/api/productApi';

// Define the Zod schema for validation
const updateFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    desc: z.string().min(1, 'Description is required'),
    hero: z.instanceof(File).refine(file => file instanceof File, {
        message: 'hero is required and must be a file.',
    }),
    price: z.string().min(0, 'Price must be greater than or equal to 0'),
    stock: z.string().min(0, 'Stock must be greater than or equal to 0'),
    mrp: z.string().min(0, 'MRP must be greater than or equal to 0'),
});

type UpdateFormInputs = z.infer<typeof updateFormSchema>;

const Product = () => {
    const navigate = useNavigate();
    const [Activate] = useActivateProductMutation();
    const [DeActivate] = useDeactivateProductMutation();
    const { data } = useAdminGetAllProductsQuery();
    console.log(data);
    const [updateProduct, { isLoading }] = useAdminUpdateProductMutation();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<UpdateFormInputs>({
        resolver: zodResolver(updateFormSchema),
    });
    const [currentProductId, setCurrentProductId] = useState<string | null>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [DeleteProduct, { isSuccess }] = useAdminDeleteProductMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = (product: any) => {
        setCurrentProductId(product?._id);
        setValue('name', product?.name);
        setValue('desc', product?.desc);
        setValue('price', product?.price);
        setValue('stock', product?.stock);
        setValue('mrp', product?.mrp);
        setValue('hero', product?.hero);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        reset();
        setIsModalOpen(false);
    };

    const onSubmit: SubmitHandler<UpdateFormInputs> = async (formData) => {
        console.log(formData, "FormData")
        try {
            // const updatedData: any = { ...formData, _id: currentProductId }
            await updateProduct({ ...formData, _id: currentProductId }).unwrap();
            setMessage({ type: 'success', text: 'Product updated successfully!' });
            reset();
            closeModal();
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update product. Please try again.' });
        }
    };
    // const DeleteErrorMessage: any = deleteError?.data?.error
    return (
        <>
            <div className="text-center mt-5">
                <h1 className="text-3xl font-semibold">All Products</h1>
            </div>
            <div className="flex justify-end px-5 mb-4">
                <button className="bg-teal-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300" onClick={() => navigate("/add-product")}>Add Product</button>
            </div>
            <div className="px-5">
                <div className="overflow-x-auto">
                    {isLoading && <div className="text-center mt-5"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div> Loading...</div>}
                    {isSuccess && <div className="alert alert-success mb-4">Product Deleted Successfully</div>}
                    {/* {isErrorDelete && <div className="alert alert-danger mb-4">{DeleteErrorMessage}</div>} */}
                    <table className="table-auto w-full border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2 border-b">Name</th>
                                <th className="p-2 border-b">Description</th>
                                <th className="p-2 border-b">Price</th>
                                <th className="p-2 border-b">Stock</th>
                                <th className="p-2 border-b">MRP</th>
                                <th className="p-2 border-b">hero</th>
                                <th className="p-2 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                                data.map((item: any) => (
                                    <tr key={item._id} className="hover:bg-gray-50">
                                        <td className="p-2 border-b">{item.name}</td>
                                        <td className="p-2 border-b">{item.desc}</td>
                                        <td className="p-2 border-b">{item.price}</td>
                                        <td className="p-2 border-b">{item.stock}</td>
                                        <td className="p-2 border-b">{item.mrp}</td>
                                        <td className="p-2 border-b">
                                            <img className="w-24 h-24 object-cover" src={item.hero} alt={item.name} />
                                        </td>
                                        <td className="p-2 border-b">
                                            <div className="flex gap-3">
                                                <button
                                                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                                                    onClick={() => handleEditClick(item)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                    onClick={() => DeleteProduct(item._id)}
                                                >
                                                    Delete
                                                </button>
                                                {!item.active ? (
                                                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => Activate(item._id)}>
                                                        Activate
                                                    </button>
                                                ) : (
                                                    <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600" onClick={() => DeActivate(item._id)}>
                                                        Deactivate
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            {/* <tr className="hover:bg-gray-50">
                                <td className="p-2 border-b">item.name</td>
                                <td className="p-2 border-b">item.desc</td>
                                <td className="p-2 border-b">item.price</td>
                                <td className="p-2 border-b">item.stock</td>
                                <td className="p-2 border-b">item.mrp</td>
                                <td className="p-2 border-b">
                                    <img className="w-24 h-24 object-cover" src="https://heros.unsplash.com/photo-1719937051230-8798ae2ebe86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8" alt=",,," />
                                </td>
                                <td className="p-2 border-b">
                                    <div className="flex gap-3">
                                        <button
                                            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                                            onClick={() => handleEditClick()}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            onClick={() => DeleteProduct()}
                                        >
                                            Delete
                                        </button>
                                        <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => Activate()}>
                                            Activate
                                        </button>
                                        <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600" onClick={() => DeActivate()}>
                                            Deactivate
                                        </button>
                                    </div>
                                </td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>

            {message && (
                <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} mt-4`} role="alert">
                    {message.text}
                </div>
            )}

            {/* Modal for Update Product */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg overflow-y-scroll">
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl font-semibold">Update Product</h1>
                            <button
                                className="text-gray-600 hover:text-gray-800"
                                onClick={closeModal}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex gap-5'>
                                <div className="mt-4">
                                    <label htmlFor="name" className="block text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        {...register('name')}
                                        className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="desc" className="block text-gray-700">Description</label>
                                    <textarea
                                        id="desc"
                                        {...register('desc')}
                                        className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                                    />
                                    {errors.desc && <p className="text-red-500 text-sm">{errors.desc.message}</p>}
                                </div>
                            </div>

                            <div className='flex gap-5'>
                                <div className="mt-4">
                                    <label htmlFor="price" className="block text-gray-700">Price</label>
                                    <input
                                        type="text"
                                        id="price"
                                        {...register('price')}
                                        className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                                    />
                                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="stock" className="block text-gray-700">Stock</label>
                                    <input
                                        type="text"
                                        id="stock"
                                        {...register('stock')}
                                        className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                                    />
                                    {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
                                </div>
                            </div>

                            <div className='flex gap-5'>
                                <div className="mt-4">
                                    <label htmlFor="mrp" className="block text-gray-700">MRP</label>
                                    <input
                                        type="text"
                                        id="mrp"
                                        {...register('mrp')}
                                        className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                                    />
                                    {errors.mrp && <p className="text-red-500 text-sm">{errors.mrp.message}</p>}
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="hero" className="block text-gray-700">hero</label>
                                    <input
                                        type="file"
                                        id="hero"
                                        onChange={e => setValue("hero", e.target.files?.[0] as File)}
                                        className="mt-2 w-full p-3 border border-gray-300 rounded-md"
                                    />
                                    {errors.hero && <p className="text-red-500 text-sm">{errors.hero.message}</p>}
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Updating...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Product;

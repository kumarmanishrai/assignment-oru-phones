@import 'tailwindcss';

type Product = {
    make: string;
    model: string;
    price: string;
    images: string[];
    seller: string;
    location: string;
    phoneNumber: number;
}

const ProductCard = ({product}: {product: Product}) => {
    return (
        <div className=''>

        </div>
    )
}
import Breadcrumbs from "./breadcrumbs";
import Form from "./create-form";

const CreateProduct = () => {
 
    return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/dashboard/products' },
          {
            label: 'Add product',
            href: '/dashboard/products/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}

export default CreateProduct;
 
const PageHeader = ({title}) => {
    return (
        <div className="h-[25vh] flex items-center justify-center bg-gray-200">
            <h2 className="text-3xl font-semibold">{title} </h2>
        </div>
    );
};
// max-w-7xl mx-auto px-2 py-[5rem]
export default PageHeader;
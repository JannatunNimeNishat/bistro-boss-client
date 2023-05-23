
import bg from '../../assets/home/chef-service.jpg'
const ChefService = ({ title, description }) => {
    return (
        <div className='bg-cover mt-5 mb-20' style={{ backgroundImage: `url(${bg})` }}>
            <div className=' min-h-[120vh] lg:min-h-[80vh] flex justify-center items-center'>
                <div className=' w-3/4 lg:w-[1096px] lg:h-[300px]  border my-auto bg-white text-center lg:flex flex-col items-center justify-center px-2 py-3 lg:px-28'>
                    <h3 className='text-5xl'>{title}</h3>
                    <p className='mt-3'>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default ChefService;
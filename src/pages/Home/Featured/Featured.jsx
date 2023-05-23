import SectionTitle from "../../../components/SectionTitle/SectionTitle";

import featuredImg from '../../../assets/home/featured.jpg'
import MyButton from "../../../components/MyButton/MyButton";
//css
import './Featured.css'
const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white  my-20 ">
            <div className="backdrop-brightness-50 pt-8">
            <SectionTitle
        
        subHeading="check it out"
        heading="Featured Item"
        >

        </SectionTitle>
        <div className="md:flex justify-center items-center pb-20 pt-12 px-36 ">
            <div>
                <img src={featuredImg} alt="" />
            </div>
            <div className="md:ml-10">
                <p>Aug 20, 2029</p>
                <p className="uppercase">Where can I get some</p>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero sunt facilis fugit quisquam quos ipsum pariatur impedit, eos, accusamus soluta itaque mollitia minus at velit vero voluptatibus eaque? Eius, hic.</p>
                <MyButton btnText="Read more"></MyButton>
            </div>
        </div>
            </div>
        </div>
    );
};

export default Featured;
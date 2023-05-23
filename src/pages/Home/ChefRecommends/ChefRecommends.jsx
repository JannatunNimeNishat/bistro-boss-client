import SectionTitle from "../../../components/SectionTitle/SectionTitle";

import cardImg from '../../../assets/home/slide1.jpg'
import MyButton from "../../../components/MyButton/MyButton";

const ChefRecommends = () => {
    return (
        <>
            <SectionTitle
                subHeading="Should Try"
                heading="CHEF RECOMMENDS"
            ></SectionTitle>
            <div className="grid grid-cos-1 md:grid-cols-3 gap-8">
                {/* 1 */}
                <div className="card w-[424px] h-[514px] bg-base-100 shadow-xl">
                    <figure className="border px-0 pt-0 w-[424px] h-[350px]">
                        <img src={cardImg} alt="Shoes" className="rounded-xl w-[424px] h-[350px]" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Caeser Salad</h2>
                        <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                        <div className="card-actions">
                            <MyButton btnText="Add to cart"></MyButton>
                            {/* <button className="btn btn-primary uppercase bg-[#E8E8E8] text-[#BB8506] border-0 border-b-2 border-[#BB8506] hover:bg-[#1F2937]">Add to cart</button> */}

                        </div>
                    </div>
                </div>
                {/* 2 */}
                <div className="card w-[424px] h-[514px] bg-base-100 shadow-xl">
                    <figure className="border px-0 pt-0 w-[424px] h-[350px]">
                        <img src={cardImg} alt="Shoes" className="rounded-xl w-[424px] h-[350px]" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Caeser Salad</h2>
                        <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                        <div className="card-actions">
                        <MyButton btnText="Add to cart"></MyButton>
                            {/* <button className="btn btn-primary uppercase bg-[#E8E8E8] text-[#BB8506] border-0 border-b-2 border-[#BB8506] hover:bg-[#1F2937]">Add to cart</button> */}
                        </div>
                    </div>
                </div>
                {/* 3 */}
                <div className="card w-[424px] h-[514px] bg-base-100 shadow-xl">
                    <figure className="border px-0 pt-0 w-[424px] h-[350px]">
                        <img src={cardImg} alt="Shoes" className="rounded-xl w-[424px] h-[350px]" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Caeser Salad</h2>
                        <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                        <div className="card-actions">
                        <MyButton btnText="Add to cart"></MyButton>
                            {/* <button className="btn btn-primary uppercase bg-[#E8E8E8] text-[#BB8506] border-0 border-b-2 border-[#BB8506] hover:bg-[#1F2937]">Add to cart</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChefRecommends;
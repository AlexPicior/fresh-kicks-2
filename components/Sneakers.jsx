import React, {useState, useEffect} from 'react'
import { AiOutlineDown, AiOutlineUp, AiOutlineLeft } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx'
import { useRouter } from 'next/router';
import Product from './Product';
import { useStateContext } from '../context/StateContext';
import { FiFilter } from 'react-icons/fi'




const Sneakers = () => {
    const router = useRouter();
    const {query} = router;
    const {setShowMenu} = useStateContext();


    const [displayAgeFilter, setDisplayAgeFilter] = useState(false);
    const [displayBrandFilter, setDisplayBrandFilter] = useState(false);
    const [displayGenderFilter, setDisplayGenderFilter] = useState(false);
    const [displaySizeFilter, setDisplaySizeFilter] = useState(false);
    const [displayPriceFilter, setDisplayPriceFilter] = useState(false);
    const [sortedBy, setSortedBy] = useState(query.sort_by);
    const [displaySortedByFilter, setDisplaySortedByFilter] = useState(false);
    const [filters, setFilters] = useState([]);
    const [products, setProducts] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [displaySliders, setDisplaySliders] = useState([false, false, false, false, false]);


    useEffect(() =>{
        
        let auxFilters = [];
        if(query.age_type)
        {
            if(query.age_type.includes("Adult"))
            {
                document.getElementById('Adult').checked = true;
                document.getElementById('Adult1').checked = true;
                auxFilters.push({type: "ageType_Adult", name:"Adult"});
            }
            else 
            {
                document.getElementById('Adult').checked = false;
                document.getElementById('Adult1').checked = false;
            }
            if(query.age_type.includes("Kid"))
            {
                document.getElementById('Kid').checked = true;
                document.getElementById('Kid1').checked = true;
                auxFilters.push({type: "ageType_Kid", name:"Kid"});
            }
            else 
            {
                document.getElementById('Kid').checked = false;
                document.getElementById('Kid1').checked = false;
            }
        }
        else
        {
            document.getElementById('Adult').checked = false;
            document.getElementById('Kid').checked = false;
            document.getElementById('Adult1').checked = false;
            document.getElementById('Kid1').checked = false;
        }
        if(query.brand)
        {
            if(query.brand.includes("Nike"))
            {
                document.getElementById('Nike').checked = true;
                document.getElementById('Nike1').checked = true;
                auxFilters.push({type: "brand_Nike", name:"Nike"});
            }
            else
            {
                document.getElementById('Nike').checked = false;
                document.getElementById('Nike1').checked = false;
            }
            if(query.brand.includes("Addidas"))
            {
                document.getElementById('Addidas').checked = true;
                document.getElementById('Addidas1').checked = true;
                auxFilters.push({type: "brand_Addidas", name:"Addidas"});
            }
            else
            {
                document.getElementById('Addidas').checked = false;
                document.getElementById('Addidas1').checked = false;
            }
            if(query.brand.includes("NewBalance"))
            {
                document.getElementById('NewBalance').checked = true;
                document.getElementById('NewBalance1').checked = true;
                auxFilters.push({type: "brand_NewBalance", name:"NewBalance"});
            }
            else
            {
                document.getElementById('NewBalance').checked = false;
                document.getElementById('NewBalance1').checked = false;
            }
            if(query.brand.includes("Puma"))
            {
                document.getElementById('Puma').checked = true;
                document.getElementById('Puma1').checked = true;
                auxFilters.push({type: "brand_Puma", name:"Puma"});
            }
            else
            {
                document.getElementById('Puma').checked = false;
                document.getElementById('Puma1').checked = false;
            }
            if(query.brand.includes("Converse"))
            {
                document.getElementById('Converse').checked = true;
                document.getElementById('Converse1').checked = true;
                auxFilters.push({type: "brand_Converse", name:"Converse"});
            }
            else
            {
                document.getElementById('Converse').checked = false;
                document.getElementById('Converse1').checked = false;
            }
            if(query.brand.includes("Vans"))
            {
                document.getElementById('Vans').checked = true;
                document.getElementById('Vans1').checked = true;
                auxFilters.push({type: "brand_Vans", name:"Vans"});
            }
            else
            {
                document.getElementById('Vans').checked = false;
                document.getElementById('Vans1').checked = false;
            }
        }
        else
        {
            document.getElementById('Nike').checked = false;
            document.getElementById('Addidas').checked = false;
            document.getElementById('NewBalance').checked = false;
            document.getElementById('Puma').checked = false;
            document.getElementById('Converse').checked = false;
            document.getElementById('Vans').checked = false;
            document.getElementById('Nike1').checked = false;
            document.getElementById('Addidas1').checked = false;
            document.getElementById('NewBalance1').checked = false;
            document.getElementById('Puma1').checked = false;
            document.getElementById('Converse1').checked = false;
            document.getElementById('Vans1').checked = false;
        }
        if(query.gender)
        {
            if(query.gender.includes("Men"))
            {
                document.getElementById('Men').checked = true;
                document.getElementById('Men1').checked = true;
                auxFilters.push({type: "gender_Men", name:"Men"});
            }
            else
            {
                document.getElementById('Men').checked = false;
                document.getElementById('Men1').checked = false;
            }
            if(query.gender.includes("Women"))
            {
                document.getElementById('Women').checked = true;
                document.getElementById('Women1').checked = true;
                auxFilters.push({type: "gender_Women", name:"Women"});
            }
            else
            {
                document.getElementById('Women').checked = false;
                document.getElementById('Women1').checked = false;
            }
            if(query.gender.includes("Unisex"))
            {
                document.getElementById('Unisex').checked = true;
                document.getElementById('Unisex1').checked = true;
                auxFilters.push({type: "gender_Unisex", name:"Unisex"});
            }
            else
            {
                document.getElementById('Unisex').checked = false;
                document.getElementById('Unisex1').checked = false;
            }
        }
        else
        {
            document.getElementById('Men').checked = false;
            document.getElementById('Women').checked = false;
            document.getElementById('Unisex').checked = false;
            document.getElementById('Men1').checked = false;
            document.getElementById('Women1').checked = false;
            document.getElementById('Unisex1').checked = false;
        }
        if(query.size)
        {
            if(query.size.includes("40"))
            {
                document.getElementById('40').checked = true;
                document.getElementById('40_1').checked = true;
                auxFilters.push({type: "size_40", name:"40"});
            }
            else
            {
                document.getElementById('40').checked = false;
                document.getElementById('40_1').checked = false;
            }
            if(query.size.includes("41"))
            {
                document.getElementById('41').checked = true;
                document.getElementById('41_1').checked = true;
                auxFilters.push({type: "size_41", name:"41"});
            }
            else
            {
                document.getElementById('41').checked = false;
                document.getElementById('41_1').checked = false;
            }
            if(query.size.includes("42"))
            {
                document.getElementById('42').checked = true;
                document.getElementById('42_1').checked = true;
                auxFilters.push({type: "size_42", name:"42"});
            }
            else
            {
                document.getElementById('42').checked = false;
                document.getElementById('42_1').checked = false;
            }
            if(query.size.includes("43"))
            {
                document.getElementById('43').checked = true;
                document.getElementById('43_1').checked = true;
                auxFilters.push({type: "size_43", name:"43"});
            }
            else
            {
                document.getElementById('43').checked = false;
                document.getElementById('43_1').checked = false;
            }
            if(query.size.includes("44"))
            {
                document.getElementById('44').checked = true;
                document.getElementById('44_1').checked = true;
                auxFilters.push({type: "size_44", name:"44"});
            }
            else
            {
                document.getElementById('44').checked = false;
                document.getElementById('44_1').checked = false;
            }
            if(query.size.includes("45"))
            {
                document.getElementById('45').checked = true;
                document.getElementById('45_1').checked = true;
                auxFilters.push({type: "size_45", name:"45"});
            }
            else
            {
                document.getElementById('45').checked = false;
                document.getElementById('45_1').checked = false;
            }
        }
        else
        {
            document.getElementById('40').checked = false;
            document.getElementById('41').checked = false;
            document.getElementById('42').checked = false;
            document.getElementById('43').checked = false;
            document.getElementById('44').checked = false;
            document.getElementById('45').checked = false;
            document.getElementById('40_1').checked = false;
            document.getElementById('41_1').checked = false;
            document.getElementById('42_1').checked = false;
            document.getElementById('43_1').checked = false;
            document.getElementById('44_1').checked = false;
            document.getElementById('45_1').checked = false;
        }
        if(query.price)
        {
            if(query.price.includes("1-500RON"))
            {
                document.getElementById('1-500RON').checked = true;
                document.getElementById('1-500RON1').checked = true;
                auxFilters.push({type: "price_1-500RON", name:"1-500RON"});
            }
            else
            {
                document.getElementById('1-500RON').checked = false;
                document.getElementById('1-500RON1').checked = false;
            }
            if(query.price.includes("501-1000RON"))
            {
                document.getElementById('501-1000RON').checked = true;
                document.getElementById('501-1000RON1').checked = true;
                auxFilters.push({type: "price_501-1000RON", name:"501-1000RON"});
            }
            else
            {
                document.getElementById('501-1000RON').checked = false;
                document.getElementById('501-1000RON1').checked = false;
            }
            if(query.price.includes("1001-1500RON"))
            {
                document.getElementById('1001-1500RON').checked = true;
                document.getElementById('1001-1500RON1').checked = true;
                auxFilters.push({type: "price_1001-1500RON", name:"1001-1500RON"});
            }
            else
            {
                document.getElementById('1001-1500RON').checked = false;
                document.getElementById('1001-1500RON1').checked = false;
            }
            if(query.price.includes("1501-2000RON"))
            {
                document.getElementById('1501-2000RON').checked = true;
                document.getElementById('1501-2000RON1').checked = true;
                auxFilters.push({type: "price_1501-2000RON", name:"1501-2000RON"});
            }
            else
            {
                document.getElementById('1501-2000RON').checked = false;
                document.getElementById('1501-2000RON1').checked = false;
            }
        }
        else
        {
            document.getElementById('1-500RON').checked = false;
            document.getElementById('501-1000RON').checked = false;
            document.getElementById('1001-1500RON').checked = false;
            document.getElementById('1501-2000RON').checked = false;
            document.getElementById('1-500RON1').checked = false;
            document.getElementById('501-1000RON1').checked = false;
            document.getElementById('1001-1500RON1').checked = false;
            document.getElementById('1501-2000RON1').checked = false;
        }
        if(query.sort_by)
        {
            if(query.sort_by.includes("Newest")) setSortedBy("Newest");
            else if(query.sort_by.includes("Highest")) setSortedBy("Highest price");
            else if(query.sort_by.includes("Lowest")) setSortedBy("Lowest price");
        }
        if(query.search)
        {
            auxFilters.push({type: "search", name:"\"" + query.search + "\""});
        }
        setFilters(auxFilters);

        let age_type, brand, gender, size, price, search;

        (!query.age_type) ? age_type = "all" : age_type = query.age_type;
        (!query.brand) ? brand = "all" : brand = query.brand;
        (!query.gender) ? gender = "all" : gender = query.gender;
        (!query.size) ? size = "all" : size = query.size;
        (!query.price) ? price = "all" : price = query.price;
        if (!query.sort_by) query.sort_by = "Newest";
        (!query.search) ? search = "all" : search = query.search;
        fetch(`https://fresh-kicks.up.railway.app/api/products/${age_type}/${brand}/${gender}/${size}/${price}/${query.sort_by}/${search}`)
        .then(response => response.json())
        .then(json =>{ 
            setProducts(json);
        });
    }, [query]);

    useEffect(()=>{
        setShowMenu(false);
    }, []);

    const displayFilters = (a, b, c, d, e, f) =>
    {
        setDisplayAgeFilter(a);
        setDisplayBrandFilter(b);
        setDisplayGenderFilter(c);
        setDisplaySizeFilter(d);
        setDisplayPriceFilter(e);
        setDisplaySortedByFilter(f);
    }

    const filterHandler = (filter) => {
        const { query } = router;
        if (filter.includes("ageType")) {
            if(!query.age_type) query.age_type = "";
            if(filter.includes("Adult"))
            {
                if(filter.includes("remove"))
                {
                    query.age_type = query.age_type.replace("Adult","");
                }
                else 
                {
                    query.age_type = query.age_type + "Adult";
                }
            }
            else if(filter.includes("Kid"))
            {
                if(filter.includes("remove"))
                { 
                    query.age_type = query.age_type.replace("Kid","");
                }
                else
                { 
                    query.age_type = query.age_type + "Kid";
                }
            }

            if(query.age_type == "") delete query.age_type;
        }
        else if (filter.includes("brand")) {
            if(!query.brand) query.brand = "";
            if(filter.includes("Nike"))
            {
                if(filter.includes("remove"))
                { 
                    query.brand = query.brand.replace("Nike","");
                }
                else
                { 
                    query.brand = query.brand + "Nike";
                }
            }
            else if(filter.includes("Addidas"))
            {
                if(filter.includes("remove"))
                { 
                    query.brand = query.brand.replace("Addidas","");
                }
                else
                { 
                    query.brand = query.brand + "Addidas";
                }
            }
            else if(filter.includes("NewBalance"))
            {
                if(filter.includes("remove"))
                { 
                    query.brand = query.brand.replace("NewBalance","");
                }
                else
                { 
                    query.brand = query.brand + "NewBalance";
                }
            }
            else if(filter.includes("Puma"))
            {
                if(filter.includes("remove"))
                { 
                    query.brand = query.brand.replace("Puma","");
                }
                else
                { 
                    query.brand = query.brand + "Puma";
                }
            }
            else if(filter.includes("Converse"))
            {
                if(filter.includes("remove"))
                { 
                    query.brand = query.brand.replace("Converse","");
                }
                else
                { 
                    query.brand = query.brand + "Converse";
                }
            }
            else if(filter.includes("Vans"))
            {
                if(filter.includes("remove"))
                { 
                    query.brand = query.brand.replace("Vans","");
                }
                else
                { 
                    query.brand = query.brand + "Vans";
                }
            }

            if(query.brand == "") delete query.brand;
        }
        else if (filter.includes("gender")){
            if (!query.gender) query.gender = "";
            if (filter.includes("Men"))
            {
                if(filter.includes("remove"))
                { 
                    query.gender = query.gender.replace("Men","");
                }
                else 
                {
                    query.gender = query.gender + "Men";
                }
            }
            else if (filter.includes("Women"))
            {
                if(filter.includes("remove"))
                { 
                    query.gender = query.gender.replace("Women","");
                }
                else
                { 
                    query.gender = query.gender + "Women";
                }
            }
            else if (filter.includes("Unisex"))
            {
                if(filter.includes("remove"))
                { 
                    query.gender = query.gender.replace("Unisex","");
                }
                else
                { 
                    query.gender = query.gender + "Unisex";
                }
            }

            if(query.gender == "") delete query.gender;
        }
        else if (filter.includes("size")){
            if(!query.size) query.size = "";

            if(filter.includes("40"))
            {
                if(filter.includes("remove"))
                { 
                    query.size = query.size.replace("+40","");
                }
                else
                { 
                    query.size = query.size + "+40";
                }
            }
            else if(filter.includes("41"))
            {
                if(filter.includes("remove"))
                { 
                    query.size = query.size.replace("+41","");
                }
                else
                { 
                    query.size = query.size + "+41";
                }
            }
            else if(filter.includes("42"))
            {
                if(filter.includes("remove"))
                { 
                    query.size = query.size.replace("+42","");
                }
                else
                { 
                    query.size = query.size + "+42";
                }
            }
            else if(filter.includes("43"))
            {
                if(filter.includes("remove"))
                { 
                    query.size = query.size.replace("+43","");
                }
                else
                { 
                    query.size = query.size + "+43";
                }
            }
            else if(filter.includes("44"))
            {
                if(filter.includes("remove"))
                { 
                    query.size = query.size.replace("+44","");
                }
                else 
                {
                    query.size = query.size + "+44";
                }
            }
            else if(filter.includes("45"))
            {
                if(filter.includes("remove"))
                { 
                    query.size = query.size.replace("+45","");
                }
                else
                { 
                    query.size = query.size + "+45";
                }
            }

            if(query.size == "") delete query.size;
        }
        else if (filter.includes("price")){
            if(!query.price) query.price = "";

            if(filter.includes("1-500RON"))
            {
                if(filter.includes("remove"))
                { 
                    query.price = query.price.replace("1-500RON","");
                }
                else 
                {
                    query.price = query.price + "1-500RON";
                }
            }
            else if(filter.includes("501-1000RON"))
            {
                if(filter.includes("remove")) 
                {
                    query.price = query.price.replace("501-1000RON","");
                }
                else 
                {
                    query.price = query.price + "501-1000RON";
                }
            }
            else if(filter.includes("1001-1500RON"))
            {
                if(filter.includes("remove")) 
                {
                    query.price = query.price.replace("1001-1500RON","");
                }
                else 
                {
                    query.price = query.price + "1001-1500RON";
                }
            }
            else if(filter.includes("1501-2000RON"))
            {
                if(filter.includes("remove")) 
                {
                    query.price = query.price.replace("1501-2000RON","");
                }
                else 
                {
                    query.price = query.price + "1501-2000RON";
                }
            }

            if(query.price == "") delete query.price;
        }
        else if (filter.includes("sortBy")){
            if(filter.includes("Newest")) query.sort_by = "Newest";
            else if(filter.includes("Highest")) query.sort_by = "Highest";
            else if(filter.includes("Lowest")) query.sort_by = "Lowest";
        }
        else if (filter.includes("search"))
        {
            if(filter.includes("remove"))
            {
                delete query.search;
            }
        }

        router.push({
            pathname: router.pathname,
            query: query,
        });

    }

    const resetFilters = () => {
        setFilters([]);

        if(query.age_type) delete query.age_type;
        if(query.brand) delete query.brand;
        if(query.gender) delete query.gender;
        if(query.size) delete query.size;
        if(query.price) delete query.price;
        if(query.search) delete query.search;

        router.push({
            pathname: router.pathname,
            query: query,
        });
    }

  return (
    <div className='flex flex-col content-center flex-wrap'>
        <div className=' h-24 flex content-center flex-wrap'>
            <span className='text-3xl font-thin '>Sneakers</span>
        </div>
        <div className='xs:w-[90%] lg:w-4/5 h-12 border-y flex justify-between content-center flex-wrap relative z-20'>
            <div className='xs:hidden lg:flex'> 
                <div className='flex flex-col content-center flex-wrap relative'>
                    <button className='h-12 xs:w-[30px] lg:w-fit' onClick={() => displayAgeFilter ? setDisplayAgeFilter(false) : displayFilters(true, false, false, false, false, false)}>  
                        <div className={`h-full px-4 hover:bg-black hover:text-white ${ displayAgeFilter ? "bg-black text-white" : ""} flex justify-center content-center flex-wrap`}>
                            <span className='font-thin mr-1'>AGE</span>
                            {displayAgeFilter ? <AiOutlineUp className='relative top-[7px] font-thin text-xs' /> : <AiOutlineDown className='relative top-[7px] font-thin text-xs' />}
                        </div>
                    </button>
                    <div className={`pl-3 absolute top-12 z-20 border-x-[1px] border-b-[1px] w-[150px] bg-white ${ displayAgeFilter ? "h-[60px] overflow-y-auto border-b-[1px]" : "h-[0px] overflow-y-hidden border-b-[0px]"} `}>
                        <div className='mt-1'>
                            <input id='Adult' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("ageType_Adult") : filterHandler("ageType_Adult_remove")}} />
                            <label className='font-poppins' htmlFor="">Adult</label>
                        </div>
                        <div>
                            <input id='Kid' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("ageType_Kid") : filterHandler("ageType_Kid_remove")}} />
                            <label className='font-poppins' htmlFor="">Kid</label>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col content-center flex-wrap relative'>
                    <button className='h-12' onClick={() => displayBrandFilter ? setDisplayBrandFilter(false) : displayFilters(false, true, false, false, false, false)}>  
                        <div className={`h-full px-4 hover:bg-black hover:text-white ${ displayBrandFilter ? "bg-black text-white" : ""} flex justify-center content-center flex-wrap`}>
                            <span className='font-thin mr-1'>BRAND</span>
                            {displayBrandFilter ? <AiOutlineUp className='relative top-[7px] font-thin text-xs' /> : <AiOutlineDown className='relative top-[7px] font-thin text-xs' />}
                        </div>
                    </button>
                    <div className={`pl-3 absolute top-12 z-20 border-x-[1px] border-b-[1px] w-[150px] bg-white ${ displayBrandFilter ? "h-[160px] overflow-y-auto border-b-[1px]" : "h-[0px] overflow-y-hidden border-b-[0px]"} `}>
                        <div className='mt-1'>
                            <input id='Nike' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("brand_Nike") : filterHandler("brand_Nike_remove")}} />
                            <label className='font-poppins' htmlFor="">Nike</label>
                        </div>
                        <div>
                            <input id='Addidas' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("brand_Addidas") : filterHandler("brand_Addidas_remove")}} />
                            <label className='font-poppins' htmlFor="">Addidas</label>
                        </div>
                        <div>
                            <input id='NewBalance' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("brand_NewBalance") : filterHandler("brand_NewBalance_remove")}} />
                            <label className='font-poppins' htmlFor="">New Balance</label>
                        </div>
                        <div>
                            <input id='Puma' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("brand_Puma") : filterHandler("brand_Puma_remove")}} />
                            <label className='font-poppins' htmlFor="">Puma</label>
                        </div>
                        <div>
                            <input id='Converse' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("brand_Converse") : filterHandler("brand_Converse_remove")}} />
                            <label className='font-poppins' htmlFor="">Converse</label>
                        </div>
                        <div>
                            <input id='Vans' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("brand_Vans") : filterHandler("brand_Vans_remove")}} />
                            <label className='font-poppins' htmlFor="">Vans</label>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col content-center flex-wrap relative'>
                    <button className='h-12' onClick={() => displayGenderFilter ? setDisplayGenderFilter(false) : displayFilters(false, false, true, false, false, false)}>  
                        <div className={`h-full px-4 hover:bg-black hover:text-white ${ displayGenderFilter ? "bg-black text-white" : ""} flex justify-center content-center flex-wrap`}>
                            <span className='font-thin mr-1'>GENDER</span>
                            {displayGenderFilter ? <AiOutlineUp className='relative top-[7px] font-thin text-xs' /> : <AiOutlineDown className='relative top-[7px] font-thin text-xs' />}
                        </div>
                    </button>
                    <div className={`pl-3 absolute top-12 z-20 border-x-[1px] border-b-[1px] w-[150px] bg-white ${ displayGenderFilter ? "h-[85px] overflow-y-auto border-b-[1px]" : "h-[0px] overflow-y-hidden border-b-[0px]"} `}>
                        <div className='mt-1'>
                            <input id='Men' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("gender_Men") : filterHandler("gender_Men_remove")}} />
                            <label className='font-poppins' htmlFor="">Men</label>
                        </div>
                        <div>
                            <input id='Women' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("gender_Women") : filterHandler("gender_Women_remove")}} />
                            <label className='font-poppins' htmlFor="">Women</label>
                        </div>
                        <div>
                            <input id='Unisex' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("gender_Unisex") : filterHandler("gender_Unisex_remove")}} />
                            <label className='font-poppins' htmlFor="">Unisex</label>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col content-center flex-wrap relative'>
                    <button className='h-12' onClick={() => displaySizeFilter ? setDisplaySizeFilter(false) : displayFilters(false, false, false, true, false, false)}>  
                        <div className={`h-full px-4 hover:bg-black hover:text-white ${ displaySizeFilter ? "bg-black text-white" : ""} flex justify-center content-center flex-wrap`}>
                            <span className='font-thin mr-1'>SIZE</span>
                            {displaySizeFilter ? <AiOutlineUp className='relative top-[7px] font-thin text-xs' /> : <AiOutlineDown className='relative top-[7px] font-thin text-xs' />}
                        </div>
                    </button>
                    <div className={`pl-3 absolute top-12 z-20 border-x-[1px] border-b-[1px] w-[150px] bg-white ${ displaySizeFilter ? "h-[157px] overflow-y-auto border-b-[1px]" : "h-[0px] overflow-y-hidden border-b-[0px]"} `}>
                        <div className='mt-1'>
                            <input id='40' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("size_40") : filterHandler("size_40_remove")}} />
                            <label className='font-poppins' htmlFor="">40</label>
                        </div>
                        <div>
                            <input id='41' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("size_41") : filterHandler("size_41_remove")}} />
                            <label className='font-poppins' htmlFor="">41</label>
                        </div>
                        <div>
                            <input id='42' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("size_42") : filterHandler("size_42_remove")}} />
                            <label className='font-poppins' htmlFor="">42</label>
                        </div>
                        <div>
                            <input id='43' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("size_43") : filterHandler("size_43_remove")}} />
                            <label className='font-poppins' htmlFor="">43</label>
                        </div>
                        <div>
                            <input id='44' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("size_44") : filterHandler("size_44_remove")}} />
                            <label className='font-poppins' htmlFor="">44</label>
                        </div>
                        <div>
                            <input id='45' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("size_45") : filterHandler("size_45_remove")}} />
                            <label className='font-poppins' htmlFor="">45</label>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col content-center flex-wrap relative'>
                    <button className='h-12' onClick={() => displayPriceFilter ? setDisplayPriceFilter(false) : displayFilters(false, false, false, false, true, false)}>  
                        <div className={`h-full px-4 hover:bg-black hover:text-white ${ displayPriceFilter ? "bg-black text-white" : ""} flex justify-center content-center flex-wrap`}>
                            <span className='font-thin mr-1'>PRICE</span>
                            {displayPriceFilter ? <AiOutlineUp className='relative top-[7px] font-thin text-xs' /> : <AiOutlineDown className='relative top-[7px] font-thin text-xs' />}
                        </div>
                    </button>
                    <div className={`pl-3 absolute top-12 z-20 border-x-[1px] border-b-[1px] w-[170px] bg-white ${ displayPriceFilter ? "h-[110px] overflow-y-auto border-b-[1px]" : "h-[0px] overflow-y-hidden border-b-[0px]"} `}>
                        <div className='mt-1'>
                            <input id='1-500RON' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("price_1-500RON") : filterHandler("price_1-500RON_remove")}} />
                            <label className='font-poppins' htmlFor="">1-500 RON</label>
                        </div>
                        <div>
                            <input id='501-1000RON' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("price_501-1000RON") : filterHandler("price_501-1000RON_remove")}} />
                            <label className='font-poppins' htmlFor="">501-1000 RON</label>
                        </div>
                        <div>
                            <input id='1001-1500RON' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("price_1001-1500RON") : filterHandler("price_1001-1500RON_remove")}} />
                            <label className='font-poppins' htmlFor="">1001-1500 RON</label>
                        </div>
                        <div>
                            <input id='1501-2000RON' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("price_1501-2000RON") : filterHandler("price_1501-2000RON_remove")}} />
                            <label className='font-poppins' htmlFor="">1501-2000 RON</label>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='flex flex-col content-center flex-wrap relative'>
                    <button className='h-12 xs:w-[150px] lg:w-[210px]' onClick={() => displaySortedByFilter ? setDisplaySortedByFilter(false) : displayFilters(false, false, false, false, false, true)}>  
                        <div className={`h-full lg:px-4 hover:bg-black hover:text-white ${ displaySortedByFilter ? "bg-black text-white" : ""} flex justify-center content-center flex-wrap`}>
                            <span className='font-thin xs:text-sm lg:text-base mr-1'>Sorted by: {sortedBy}</span>
                            {displaySortedByFilter ? <AiOutlineUp className='relative top-[7px] font-thin text-xs' /> : <AiOutlineDown className='relative top-[7px] font-thin text-xs' />}
                        </div>
                    </button>
                    <div className={`pl-3 absolute top-12 z-20 border-x-[1px] border-b-[1px] xs:w-[170px] lg:w-[210px] bg-white ${ displaySortedByFilter ? "h-[85px] overflow-y-auto border-b-[1px]" : "h-[0px] overflow-y-hidden border-b-[0px]"} `}>
                        <div className='mt-1'>
                            <input className='mr-1' type="radio" id='Newest' value={'Newest'} checked={sortedBy == 'Newest' ? true : false} onChange={(e) => {setSortedBy('Newest'); e.target.checked ? filterHandler("sortBy_Newest") : filterHandler("sortBy_Newest_remove")}}/>
                            <label className='font-poppins xs:text-sm lg:text-base' htmlFor="">Newest</label>
                        </div>
                        <div>
                            <input className='mr-1' type="radio" id='Highest price' value={'Highest price'} checked={sortedBy == 'Highest price' ? true : false} onChange={(e) => {setSortedBy('Highest price'); e.target.checked ? filterHandler("sortBy_Highest") : filterHandler("sortBy_Highest_remove")}} />
                            <label className='font-poppins xs:text-sm lg:text-base' htmlFor="">Highest price</label>
                        </div>
                        <div>
                            <input className='mr-1' type="radio" id='Lowest price' value={'Lowest price'} checked={sortedBy == 'Lowest price' ? true : false} onChange={(e) => {setSortedBy('Lowest price'); e.target.checked ? filterHandler("sortBy_Lowest") : filterHandler("sortBy_Lowest_remove")}} />
                            <label className='font-poppins xs:text-sm lg:text-base' htmlFor="">Lowest price</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className='xs:flex lg:hidden'>
                <button className='font-thin xs:text-sm flex justify-center content-center flex-wrap pr-2' onClick={() => setShowFilters(true)}>Filters<FiFilter className='relative top-[4px] ml-1'/></button>
            </div>
        </div>
        <div className='xs:w-[90%] lg:w-4/5 h-fit relative z-10 mb-44'>
            <div className='flex xs:px-2 lg:px-5 py-3'>
                { filters.length > 0 && (
                    <div className='flex content-center flex-wrap'>
                        {filters?.map((filter, index) => (
                            <div key={index} className='rounded-2xl px-2 h-5 bg-zinc-100 flex justify-center content-center flex-wrap mr-2 mb-2'>
                                <span className='font-thin text-xs mr-[2px]'>{filter.name}</span>
                                <button className='relative top-[1px]' onClick={() => filterHandler(filter.type + "_remove")}><RxCross2 className='font-thin text-xs'/></button>
                            </div>
                        ))}
                        <button className='font-thin text-xs ml-4 mb-2' onClick={() => resetFilters()}>Reset filters</button>
                    </div>
                )}
                { filters.length == 0 && (
                    <div className='flex content-center flex-wrap'>
                        <span className='font-thin text-xs ml-4'>No filters</span>
                    </div>
                )}
                
            </div>
            <div className='flex justify-end pb-4 pr-3'>
                <span className='font-thin xs:text-xs sss:text-sm'>{products.length} products</span>
            </div>
            
            <div className='grid grid-cols-1 w-full '>
                {products.length > 0 && (
                    <div className='grid xs:grid-cols-2 lg:grid-cols-4 w-[90%] justify-self-center'>
                        {products?.map((product, index) => <div key={index} className='justify-self-center xs:w-[90%] lg:w-fit'><Product product={product}/></div>)}
                    </div>
                )}
                {products.length == 0 && (<span className='text-2xl font-thin'>No products</span>)}
            </div>
            
            
        </div>

        <div className='fixed top-0 z-[60] w-full'>
        <div className = {`${showFilters ? 'flex' : 'hidden'} flex-row sticky top-0 w-full`}>
        <div className='xs:w-2/12 lg:w-8/12 h-[100vh] bg-black opacity-50' onClick={() => setShowFilters(false)}></div>
        <div className='top-0 z-[60] h-[100vh] xs:w-10/12 lg:w-4/12 bg-white'>
          <div className='xs:px-5 lg:px-10'>
            <div className='border-b py-4 pr-4 mb-4 flex justify-between'>
              <div className='flex'>
                <button className='relative xs:right-[15px] lg:right-[25px]' onClick={() => setShowFilters(false)}>
                  <AiOutlineLeft></AiOutlineLeft>
                </button>
                <span className='text-xl font-poppins'>Filters</span>
              </div>
              
            </div>


            <div className={`${displaySliders[0] ? "h-[95px]" : "h-[35px]"} border-b-[1.5px] xs:w-[225px] sss:w-[260px] ss:w-[300px] pt-1 pl-2 pr-3 bg-white relative z-[60] transition-all duration-700`}>
              
                <div className='flex justify-between'>
                  <span className='font-sans text-zinc-800 '>AGE</span>
                  <button onClick={() => displaySliders[0] ? setDisplaySliders([false, false, false, false, false]) : setDisplaySliders(displaySliders => displaySliders.map((slider, index)=> index == 0 ? true : false))}>
                      {displaySliders[0] ? <AiOutlineUp className='relative top-1' /> : <AiOutlineDown className='relative top-1' />}
                  </button>
                </div>
              

                <div className={`${displaySliders[0] ? "visible" : "invisible"} w-[200px]  ${displaySliders[0] ? "h-[62px] mt-1 p-1" : "h-[0px]"}  relative z-[70] overflow-y-auto transition-all duration-700 `}>
                    <div className='mt-1'>
                        <input id='Adult1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("ageType_Adult") : filterHandler("ageType_Adult_remove")}} />
                        <label className='font-poppins' htmlFor="">Adult</label>
                    </div>
                    <div>
                        <input id='Kid1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("ageType_Kid") : filterHandler("ageType_Kid_remove")}} />
                        <label className='font-poppins' htmlFor="">Kid</label>
                    </div>
                </div>
            </div>

            <div className={`${displaySliders[1] ? "h-[200px]" : "h-[35px]"} border-b-[1.5px] xs:w-[225px] sss:w-[260px] ss:w-[300px] pt-1 pl-2 pr-3 bg-white relative z-[60] transition-all duration-700`}>
              
                <div className='flex justify-between'>
                  <span className='font-sans text-zinc-800 '>BRAND</span>
                  <button onClick={() => displaySliders[1] ? setDisplaySliders([false, false, false, false, false]) : setDisplaySliders(displaySliders => displaySliders.map((slider, index)=> index == 1 ? true : false))}>
                      {displaySliders[1] ? <AiOutlineUp className='relative top-1' /> : <AiOutlineDown className='relative top-1' />}
                  </button>
                </div>
              

                <div className={`${displaySliders[1] ? "visible" : "invisible"} w-[200px]  ${displaySliders[1] ? "h-[165px] mt-1 p-1" : "h-[0px]"}  relative z-[70] overflow-y-auto transition-all duration-700 `}>
                    <div className='mt-1'>
                        <input id='Nike1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("brand_Nike") : filterHandler("brand_Nike_remove")}} />
                        <label className='font-poppins' htmlFor="">Nike</label>
                    </div>
                    <div>
                        <input id='Addidas1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("brand_Addidas") : filterHandler("brand_Addidas_remove")}} />
                        <label className='font-poppins' htmlFor="">Addidas</label>
                    </div>
                    <div>
                        <input id='NewBalance1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("brand_NewBalance") : filterHandler("brand_NewBalance_remove")}} />
                        <label className='font-poppins' htmlFor="">New Balance</label>
                    </div>
                    <div>
                        <input id='Puma1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("brand_Puma") : filterHandler("brand_Puma_remove")}} />
                        <label className='font-poppins' htmlFor="">Puma</label>
                    </div>
                    <div>
                        <input id='Converse1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("brand_Converse") : filterHandler("brand_Converse_remove")}} />
                        <label className='font-poppins' htmlFor="">Converse</label>
                    </div>
                    <div>
                        <input id='Vans1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("brand_Vans") : filterHandler("brand_Vans_remove")}} />
                        <label className='font-poppins' htmlFor="">Vans</label>
                    </div>
                </div>
            </div>

            <div className={`${displaySliders[2] ? "h-[125px]" : "h-[35px]"} border-b-[1.5px] xs:w-[225px] sss:w-[260px] ss:w-[300px] pt-1 pl-2 pr-3 bg-white relative z-[60] transition-all duration-700`}>
              
                <div className='flex justify-between'>
                  <span className='font-sans text-zinc-800 '>GENDER</span>
                  <button onClick={() => displaySliders[2] ? setDisplaySliders([false, false, false, false, false]) : setDisplaySliders(displaySliders => displaySliders.map((slider, index)=> index == 2 ? true : false))}>
                      {displaySliders[2] ? <AiOutlineUp className='relative top-1' /> : <AiOutlineDown className='relative top-1' />}
                  </button>
                </div>
              

                <div className={`${displaySliders[2] ? "visible" : "invisible"} w-[200px]  ${displaySliders[2] ? "h-[90px] mt-1 p-1" : "h-[0px]"}  relative z-[70] overflow-y-auto transition-all duration-700 `}>
                    <div className='mt-1'>
                        <input id='Men1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("gender_Men") : filterHandler("gender_Men_remove")}} />
                        <label className='font-poppins' htmlFor="">Men</label>
                    </div>
                    <div>
                        <input id='Women1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("gender_Women") : filterHandler("gender_Women_remove")}} />
                        <label className='font-poppins' htmlFor="">Women</label>
                    </div>
                    <div>
                        <input id='Unisex1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("gender_Unisex") : filterHandler("gender_Unisex_remove")}} />
                        <label className='font-poppins' htmlFor="">Unisex</label>
                    </div>
                </div>
            </div>

            <div className={`${displaySliders[3] ? "h-[200px]" : "h-[35px]"} border-b-[1.5px] xs:w-[225px] sss:w-[260px] ss:w-[300px] pt-1 pl-2 pr-3 bg-white relative z-[60] transition-all duration-700`}>
              
                <div className='flex justify-between'>
                  <span className='font-sans text-zinc-800 '>SIZE</span>
                  <button onClick={() => displaySliders[3] ? setDisplaySliders([false, false, false, false, false]) : setDisplaySliders(displaySliders => displaySliders.map((slider, index)=> index == 3 ? true : false))}>
                      {displaySliders[3] ? <AiOutlineUp className='relative top-1' /> : <AiOutlineDown className='relative top-1' />}
                  </button>
                </div>
              

                <div className={`${displaySliders[3] ? "visible" : "invisible"} w-[200px]  ${displaySliders[3] ? "h-[165px] mt-1 p-1" : "h-[0px]"}  relative z-[70] overflow-y-auto transition-all duration-700 `}>
                    <div className='mt-1'>
                        <input id='40_1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("size_40") : filterHandler("size_40_remove")}} />
                        <label className='font-poppins' htmlFor="">40</label>
                    </div>
                    <div>
                        <input id='41_1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("size_41") : filterHandler("size_41_remove")}} />
                        <label className='font-poppins' htmlFor="">41</label>
                    </div>
                    <div>
                        <input id='42_1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("size_42") : filterHandler("size_42_remove")}} />
                        <label className='font-poppins' htmlFor="">42</label>
                    </div>
                    <div>
                        <input id='43_1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("size_43") : filterHandler("size_43_remove")}} />
                        <label className='font-poppins' htmlFor="">43</label>
                    </div>
                    <div>
                        <input id='44_1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("size_44") : filterHandler("size_44_remove")}} />
                        <label className='font-poppins' htmlFor="">44</label>
                    </div>
                    <div>
                        <input id='45_1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("size_45") : filterHandler("size_45_remove")}} />
                        <label className='font-poppins' htmlFor="">45</label>
                    </div>
                </div>
            </div>

            <div className={`${displaySliders[4] ? "h-[150px]" : "h-[35px]"} border-b-[1.5px] xs:w-[225px] sss:w-[260px] ss:w-[300px] pt-1 pl-2 pr-3 bg-white relative z-[60] transition-all duration-700`}>
              
                <div className='flex justify-between'>
                  <span className='font-sans text-zinc-800 '>PRICE</span>
                  <button onClick={() => displaySliders[4] ? setDisplaySliders([false, false, false, false, false]) : setDisplaySliders(displaySliders => displaySliders.map((slider, index)=> index == 4 ? true : false))}>
                      {displaySliders[4] ? <AiOutlineUp className='relative top-1' /> : <AiOutlineDown className='relative top-1' />}
                  </button>
                </div>
              

                <div className={`${displaySliders[4] ? "visible" : "invisible"} w-[200px]  ${displaySliders[4] ? "h-[115px] mt-1 p-1" : "h-[0px]"}  relative z-[70] overflow-y-auto transition-all duration-700 `}>
                    <div className='mt-1'>
                        <input id='1-500RON1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("price_1-500RON") : filterHandler("price_1-500RON_remove")}} />
                        <label className='font-poppins' htmlFor="">1-500 RON</label>
                    </div>
                    <div>
                        <input id='501-1000RON1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("price_501-1000RON") : filterHandler("price_501-1000RON_remove")}} />
                        <label className='font-poppins' htmlFor="">501-1000 RON</label>
                    </div>
                    <div>
                        <input id='1001-1500RON1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("price_1001-1500RON") : filterHandler("price_1001-1500RON_remove")}} />
                        <label className='font-poppins' htmlFor="">1001-1500 RON</label>
                    </div>
                    <div>
                        <input id='1501-2000RON1' className='mr-1' type="checkbox" onClick={(e) => {e.target.checked ? filterHandler("price_1501-2000RON") : filterHandler("price_1501-2000RON_remove")}} />
                        <label className='font-poppins' htmlFor="">1501-2000 RON</label>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    
    </div>
  )
}

export default Sneakers
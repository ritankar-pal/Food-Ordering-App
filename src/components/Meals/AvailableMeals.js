import styles from './AvailableMeals.module.css';

import Card from '../UI/Card';

import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';




// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
// ];







function AvailableMeals(props) {

  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true); 
  const [httpError, setHttpError] = useState();



  useEffect(()=>{

    console.log("USE_EFFECT from AVAILABLE MEALS");
    
    

    const fetchMeals = async () =>{
  
      const response = await fetch("https://food-app-ae160-default-rtdb.firebaseio.com/meals.json");

      if(!response.ok){
        throw new Error("Something Went Wrong!")
      }
      
      const responseData = await response.json();  //this is an object
      
      //we want to push this objecy in an array: 
      
      const loadedMeals = []; 

      for(const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name, 
          description: responseData[key].description,
          price: responseData[key].price
        })
      }

      setMeals(loadedMeals);
      setIsLoading(false)
      
    }
    

    //Error handling won't work here. Since fetchMeals is an async function so, any error inside will return in "reject state of promise. Hence we have to attach error to fetchMeals({"
    // try{
      
    //   fetchMeals();

    // }catch(error){
      
    //   setIsLoading(false)
    //   setHttpError(error.message)
    // }

    fetchMeals().catch(error =>{
      setIsLoading(false)
      setHttpError(error.message)
    })

  }, [])



    //Added the Loading state:
    if (isLoading){
      return(
        <section className={styles.Mealsloading}>
          <p>Loading...</p>
        </section>
      )
    }
    
    
    //Checking Error:
    if(httpError){
      return(
        <section className={styles.MealsError}>
          <p>{httpError}</p>
        </section>
      )
    }

    // const mealsList = DUMMY_MEALS.map((meal)=>(
    const mealsList = meals.map((meal)=>(

        <MealItem key={meal.id}  id={meal.id} name={meal.name} description={meal.description} price={meal.price}/>
    ))


    return(

       <section className={styles.meals}>
          
          <Card>
            <ul>
              {mealsList}
            </ul>
          </Card>
            
       </section>

    )
}; 

export default AvailableMeals;


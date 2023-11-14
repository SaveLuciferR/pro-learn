import React, {useState, createContext, useEffect} from "react";
import axiosClient from "../../../axiosClient";
import BlogSliderList from "./BlogSliderList";
import BlogSliderUnder from "./BlogSliderUnder";
import {useDispatch, useSelector} from "react-redux";
import {setBestBlogItems, setSlideIndex, setTouchPosition} from "../../../redux/Blog/slice";


const BestBlogSlider = ({autoPlay, autoPlayTime}) => {

    const dispatch = useDispatch();

    const bestBlogItems = useSelector(state => state.blog.bestBlogItems);
    const slideIndex = useSelector(state => state.blog.slideIndex);
    const touchPosition = useSelector(state => state.blog.touchPosition);

    useEffect(() => {
        axiosClient.post("/blog").then(({data}) => {
            dispatch(setBestBlogItems(data.popularBlogs));
        });
    }, []);

    const changeSlide = (direction = 1) => {
        console.log(direction);
        let slideNumber = 0;

        if (slideIndex + direction < 0) {
            slideNumber = (bestBlogItems.length / 2) - 1;
        } else {
            slideNumber = (slideIndex + direction) % (bestBlogItems.length / 2);
        }

        dispatch(setSlideIndex(slideNumber));
    }

    const goToSlide = (number) => {
        dispatch(setSlideIndex(number % (bestBlogItems.length / 2)));
    }

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;

        dispatch(setTouchPosition(touchDown));
    }

    const handleTouchMove = (e) => {
        if (touchPosition === null) {
            return;
        }

        const currentPosition = e.touches[0].clientX;
        const direction = touchPosition - currentPosition;

        if (direction > 10) {
            changeSlide(1);
        }

        if (direction < -10) {
            changeSlide(-1);
        }

        dispatch(setTouchPosition(null));
    }

    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            changeSlide(1);
        }, autoPlayTime);

        return () => {
            clearInterval(interval);
        };
    }, [bestBlogItems.length, slideIndex])

    return (
        <div className={"best_blog_slider"}
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
        >
            <BlogSliderList/>
            <BlogSliderUnder
                changeSlide={(e) => changeSlide(e)}
                goToSlide={(e) => goToSlide(e)}
            />
        </div>
    );
}

export default BestBlogSlider;
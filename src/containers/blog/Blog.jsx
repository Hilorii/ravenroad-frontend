import React from 'react';
import Article from '../../components/article/Article';
import { blog01, blog02, blog03, blog04, blog05 } from './import';
import './blog.css';

const Blog = () => (
    <div className="rr__blog section__padding" id="blog">
        <div className="rr__blog-heading">
            <h1 className="gradient__text">Wiele się dzieje, <br /> Tutaj się wszystkiego dowiesz.</h1>
        </div>
        <div className="rr__blog-container">
            <div className="rr__blog-container_groupA">
                <Article imgUrl={blog01} date="Lip 01, 2024" text="Powstał pomysł o stworzeniu Raven Road. Dowiedź się jak to było." />
            </div>
            <div className="rr__blog-container_groupB">
                <Article imgUrl={blog02} date="Lip 8, 2024" text="Mamy plan!" />
                <Article imgUrl={blog03} date="Lip 15, 2024" text="Czy to by było na tyle?" />
                <Article imgUrl={blog04} date="Lip 21, 2024" text="Jednak nie! powstaje zarys aplikacji na androida" />
                <Article imgUrl={blog05} date="Lip 21, 2024" text="Powstaje zarys strony internetowej" />
            </div>
        </div>
    </div>
);

export default Blog;

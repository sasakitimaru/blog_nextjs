import React, { useState, useEffect } from 'react'
import { Tag } from '../../../lib/notionAPI'
import styles from './Tags.module.scss'
interface TagProps {
    tags: Tag[]
}
const Tags = ({ tags }: TagProps) => {
    const [adjustedColors, setAdjustedColors] = useState({});
    useEffect(() => {
        const colorNameToRGBA = (colorName) => {
            const cvs = document.createElement('canvas');
            cvs.height = 1;
            cvs.width = 1;
            const ctx = cvs.getContext('2d');
            ctx.fillStyle = colorName;
            ctx.fillRect(0, 0, 1, 1);
            const rgba = ctx.getImageData(0, 0, 1, 1).data;
            return rgba;
        }

        const adjustColorOpacity = (rgba, opacity) => {
            const [r, g, b, a] = rgba;
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }

        let newAdjustedColors = {};
        tags.forEach(tag => {
            newAdjustedColors[tag.color] = adjustColorOpacity(colorNameToRGBA(tag.color), 0.5);
        });

        setAdjustedColors(newAdjustedColors);
    }, [tags]);

    return (
        <div className={styles['post-tags']}>
            {tags.map((tag, index) => (
                <span key={index} style={{ backgroundColor: adjustedColors[tag.color] }} className={styles['post-tag']}>{tag.name}</span>
            ))}
        </div>
    )
}

export default Tags
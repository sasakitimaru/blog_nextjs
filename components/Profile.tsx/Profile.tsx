import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import styles from './Profile.module.scss'

const Profile = () => {
    return (
        <div className={styles['Profile-container']}>
            <h4>ささきち</h4>
            <div className={styles['profile-image-container']}>
                <img src="/IMG_8346.jpeg" alt="profile" className={styles['profile-image']} />
            </div>
            <p>Webエンジニア...ではなく普段はネットワークエンジニアとしてPMをしています。
                しごおわと休みの日にReactとかPythonとかでポチポチコーディングしています。切実に開発のお仕事がしたい。
            </p>
            <div className={styles['profile-icon-container']}>
                <div className={`${styles['icon']} ${styles['twitter-icon']}`}>
                    <Link href="https://twitter.com/ado_fuku0312">
                        <FontAwesomeIcon icon={faTwitter} size="lg" />
                    </Link>
                </div>
                <div className={`${styles['icon']} ${styles['github-icon']}`}>
                    <Link href="https://github.com/sasakitimaru">
                        <FontAwesomeIcon icon={faGithub} size="lg" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Profile
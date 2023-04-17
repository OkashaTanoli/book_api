import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <div className={`${styles.container} ${inter.className}`}>
            <div>
                <h1 className={styles.heading}>Books Api</h1>
                <div className={styles.sub}>
                    <h2 className={styles.endpoint}>END POINTS :</h2>
                    <ul className={styles.ul}>
                        <li>
                            /api-clients ------ (POST request, create clients, and name and email as body)
                        </li>
                        <li>
                            /books ------ (GET request, get all books, type and limit as query params &quot;Optional&quot;)
                        </li>
                        <li>
                            /books/:bookId ------ (GET request, get single books, id as params)
                        </li>
                        <li>
                            /orders ------ (GET and POST requests, get and post orders, for post bookId and customerName as body)
                        </li>
                        <li>
                            /orders/:id ------ (GET and PATCH and DELETE requests, get and update and delete order, for update customerName as body and id as params for all requests)
                        </li>
                        <li>
                            /status ------ (to check API status)
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

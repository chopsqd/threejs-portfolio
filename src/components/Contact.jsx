import {useRef, useState} from 'react'
import emailjs from "@emailjs/browser";
import {motion} from 'framer-motion'
import {styles} from '../styles'
import {EarthCanvas} from './canvas'
import {SectionWrapper} from '../hoc'
import {slideIn} from '../utils/motion'

const Contact = () => {
    const formRef = useRef()
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = event => {
        const {name, value} = event.target

        setForm({...form, [name]: value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        setLoading(true)

        emailjs.send(
            'serviceID',
            'templateID',
            {
                from_name: form.name,
                to_name: "Chopsqd",
                from_email: form.email,
                to_email: "template@gmail.com",
                message: form.message
            },
            'publicKey'
        )
        .then(() => {
            setLoading(false)
            alert('Thank you. I will get back to you as soon as possible!')

            setForm({
                name: '',
                email: '',
                message: ''
            })
        })
        .catch(error => {
            console.log(error)
            setLoading(false)
            alert('Something went wrong. Please try again!')
        })
    }

    return (
        <div className={"xl:mt-12 xl:flex-row flex flex-col-reverse gap-10 overflow-hidden"}>
            <motion.div
                variants={slideIn("left", "tween", 0.2, 1)}
                className={"flex-[0.75] bg-black-100 p-8 rounded-2xl"}
            >
                <p className={styles.sectionSubText}>Get in touch</p>
                <h2 className={styles.heroHeadText}>Contact.</h2>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className={"mt-12 flex flex-col gap-8"}
                >
                    <label className={"flex flex-col"}>
                        <span className={"text-white font-medium mb-4"}>Your Name</span>
                        <input
                            type="text"
                            name={"name"}
                            value={form.name}
                            onChange={handleChange}
                            placeholder={"What's your name?"}
                            className={"bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"}
                        />
                    </label>

                    <label className={"flex flex-col"}>
                        <span className={"text-white font-medium mb-4"}>Your Email</span>
                        <input
                            type="email"
                            name={"email"}
                            value={form.email}
                            onChange={handleChange}
                            placeholder={"What's your email?"}
                            className={"bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"}
                        />
                    </label>

                    <label className={"flex flex-col"}>
                        <span className={"text-white font-medium mb-4"}>Your Message</span>
                        <textarea
                            rows={7}
                            name={"message"}
                            value={form.message}
                            onChange={handleChange}
                            placeholder={"What do you want to say?"}
                            className={"bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"}
                        />
                    </label>

                    <button
                        type={"submit"}
                        className={"bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"}
                    >
                        {loading ? "Sending..." : "Send"}
                    </button>
                </form>
            </motion.div>

            <motion.div
                variants={slideIn("right", "tween", 0.2, 1)}
                className={"xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"}
            >
                <EarthCanvas/>
            </motion.div>
        </div>
    )
}

export default SectionWrapper(Contact, "contact")

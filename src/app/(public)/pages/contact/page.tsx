// pages/contact.js
export const metadata = {
  title: "Contact Us",
  alternates:{
    canonical:"/pages/contact"
  }
}


export default function Contact() {
  const input_control = "shadow-sm text-sm rounded-lg  block w-full p-2.5 bg-gray-200 border-red-500 placeholder-gray-400 text-whit focus:border-red-600  shadow-sm-light";
  return (
    <section className="  ">
    <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-primary">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-900 sm:text-xl">Contact Matka Juju for any inquiries or feedback.</p>
        <form action="#" className="space-y-8">
            <div>
                <label htmlFor="email" className="block mb-2 text-base font-medium text-primary">Your email</label>
                <input type="email" id="email" className={input_control} placeholder="email@gmasil.com" required/>
            </div>
            <div>
                <label htmlFor="subject" className="block mb-2 text-base font-medium text-primary">Subject</label>
                <input type="text" id="subject" className={input_control} placeholder="Let us know how we can help you" required/>
            </div>
            <div className="sm:col-span-2">
                <label htmlFor="message" className="block mb-2 text-base font-medium text-primary">Your message</label>
                <textarea id="message" rows={6} className={input_control} placeholder="Leave a comment..."></textarea>
            </div>
            <button type="submit" className="py-3 px-5 text-sm font-medium text-center  rounded-lg bg-yellow-500">Send message</button>
        </form>
    </div>
  </section>
  );
}

<form method="POST" action="?/comment" class="space-y-8">
    <div>
        <label for="full-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full Name</label>
        <input type="text" name="full_name" id="full-name" 
        class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg 
        border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
        dark:focus:border-primary-500 dark:shadow-sm-light" 
        placeholder="Let us know how we can help you" required>
    </div>

    <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
        <input type="email" name="email" id="email" 
        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 
        focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" 
        placeholder="name@flowbite.com" required>
    </div>
    
    <div class="sm:col-span-2">
        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
        <textarea id="description" name="description" rows="6" 
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm 
        border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 
        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
        placeholder="Leave a comment..." required></textarea>
    </div>
    <button type="submit" 
    class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-black
    sm:w-fit hover:bg-black focus:ring-4 focus:outline-none
    dark:black dark:hover:bg-black dark:focus:black">
        Comment
    </button>
</form>
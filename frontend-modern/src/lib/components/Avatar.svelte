<!-- Avatar.svelte -->
<script>
    export let fullName = '';
    
    function getInitials(fullName) {
      const nameParts = fullName.split(' ');
      return nameParts.map(name => name.charAt(0)).join('').toUpperCase();
    }
  </script>
  
  <div class="avatar">
    {#if fullName}
      <div class="avatar-initials">{getInitials(fullName)}</div>
    {/if}
  </div>
  
<style>
/* Import Tailwind CSS */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

.avatar {
    /* Customize the avatar container styles here */
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #4F46E5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: white;
}

.avatar-initials {
    /* Customize the avatar initials styles here */
}
</style>
  
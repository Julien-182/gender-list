var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com//Julien-182/gender-list.git', // Update to point to your repository  
        user: {
            name: 'Julien', // update to use your name
            email: 'julien.ducrot.mess@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)
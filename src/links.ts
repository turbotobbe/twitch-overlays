const github = {
    owner:{
        name: import.meta.env.VITE_REPO_OWNER,
        url: `https://github.com/${import.meta.env.VITE_REPO_OWNER}`,
        api: `https://api.github.com/users/${import.meta.env.VITE_REPO_OWNER}`
    },
    repo:{
        name: import.meta.env.VITE_REPO_NAME,
        url: `https://github.com/${import.meta.env.VITE_REPO_OWNER}/${import.meta.env.VITE_REPO_NAME}`,
        api: `https://api.github.com/repos/${import.meta.env.VITE_REPO_OWNER}/${import.meta.env.VITE_REPO_NAME}`
    }
}

export { github }

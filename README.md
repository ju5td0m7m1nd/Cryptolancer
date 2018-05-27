# Cryptolancer
A blockchain based platform for freelacer.

Install dependency
`yarn`

Run Application
`yarn start`

## Contract deployment
###### You need to start your own test net before deploy contract

```
truffle compile
truffle deploy
```

## React Project structure and coding style

You can go to the corresponding section by adding the correct pathname after /dashboard/{pathname}
for exmaple, http://${yourdomain}/dashboard/task for task related UI, http://${yourdomain}/dashboard/settings for settings page.

As the React coding style.

1. Each section will have a directory under /containers, and the nested routing components will put in the components directory under it. (for example, the form of creating new task, will put at /containers/task/components/create)
2. private function using underscore as prefix, like _handleSubmit
3. camel case naming. (taskCreate, handleInput, etc.)

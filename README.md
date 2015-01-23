# Ruby on Rail + Semantic UI + React

Little experiment using this three technologies.

# TIL
* Some INPUTS, like checkbox, are 'masked' by DIVs when used with Semantic UI, so yo cannot access directly to the INPUT.
* Due to JSX, some Semantic UI are not initilized correctly when used insidea React component. This initialization must be done inside `componentDidUpdate` or something like that.

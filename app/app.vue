<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
p,
span {
  word-break: keep-all;
  margin: 0;
  padding: 0;
}

ul {
  padding: 0;
}

li {
  list-style: none;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

a {
  text-decoration: none;
}

button {
  background: none;
  border: 0;
  outline: 0;
  padding: 0;
}

.inner {
  max-width: 1200px;
}
</style>
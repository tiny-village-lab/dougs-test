# Dougs test technique

J'ai utilisé cette stack : 

* express
* typescript
* jest
* supertest

## MovementService

L'algorithme en question se passe dans `src/services/movement.service.ts`. 

Le point d'entrée de ce service est la méthode `validateMovements()`. 

Ce service reçoit une liste de `movements` et de `checkpoints`. 

Dans ce service, j'ai fait toute une série de conditions pour essayer d'identifier des données qui seraient impossible à traiter (par exemple s'il manque le solde de départ). 

Ensuite le service découpe les données en plus petites portions en fonction des balances reçues. Ca nous permet de traiter solde par solde via la méthode `verifyOnePeriod()`

* on a 1 solde de départ
* 1 solde de fin qui va servir de vérification
* on "applique" les movements sur le solde de départ, et on teste si on est égal au solde de fin. 

Si on a reçu 5 soldes, la méthode `verifyOnePeriod()` sera appelée 4 fois. 

Ca nous permet de retourner un message d'erreur plus précis.

## Amélioration possible

La méthode `verifyOnePeriod()` pourrait être exporter dans un autre service qui ne prendrait qu'un solde de départ et de fin, et une liste de movements. On pourrait mettre ce service sur une lambda, l'appeler en async pour traiter les portions en asynchrone. 

## Utilisation

* `npm run start`: pour lancer le server sur le port 9000
* `npm run test` : pour lancer les tests

### Routes

`POST /movements/validation` 

```
{
    movements: [{id: number, date: Date, wording: string, amount: number}],
    balances: [date: Date, balance: number]
} 
```

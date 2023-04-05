import pygame
import math
import random

# Définition des constantes
WIDTH = 1000
HEIGHT = 600
RADIUS = 150
CENTER = (int(WIDTH/2), int(HEIGHT/2))
NUM_SATELLITES = 500


# Initialisation de Pygame
pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Terre avec des satellites')

# Charger l'image de texture de la Terre
texture = pygame.image.load('earth_texture.jpg').convert()

# Boucle principale du programme
clock = pygame.time.Clock()
done = False

# Initialisation des positions des satellites
satellites = []
for i in range(NUM_SATELLITES):
    # Générer une distance aléatoire entre le rayon de la Terre et le double du rayon
    distance = random.uniform(RADIUS*1.1, RADIUS*2)
    # Générer un angle aléatoire en radians
    angle = random.uniform(0, 2*math.pi)
    # Initialiser la couleur à blanc
    satellites.append((distance, angle, (255, 255, 255)))

# Initialisation du compteur de collisions
collision_count = 0

while not done:
    # Gestion des événements
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True
    
    # Effacer l'écran
    screen.fill((0, 0, 0))
    
    # Dessiner la Terre
    texture = pygame.transform.scale(texture, (RADIUS*2.3, RADIUS*2))
    screen.blit(texture, (CENTER[0]-RADIUS-15, CENTER[1]-RADIUS))
    
    # Dessiner les satellites
    for i, (distance, angle, couleur) in enumerate(satellites):
        x = int(CENTER[0] + distance*math.cos(angle))
        y = int(CENTER[1] + distance*math.sin(angle))
        # Dessiner le satellite avec sa couleur actuelle
        pygame.draw.circle(screen, couleur, (x, y), 1)
        # Vérifier si le satellite est entré en collision avec un autre satellite
        for j in range(i+1, len(satellites)):
            distance2, angle2, couleur2 = satellites[j]
            dx = CENTER[0] + distance*math.cos(angle) - CENTER[0] - distance2*math.cos(angle2)
            dy = CENTER[1] + distance*math.sin(angle) - CENTER[1] - distance2*math.sin(angle2)
            if math.sqrt(dx*dx + dy*dy) < 1:
                if couleur2!=(255, 0, 0) and couleur!=(255, 0, 0):
                    collision_count += 1
                # Les satellites sont entrés en collision, changer leur couleur en rouge
                satellites[i] = (distance, angle, (255, 0, 0))
                satellites[j] = (distance2, angle2, (255, 0, 0))


    font = pygame.font.Font(None, 30)
    text = font.render('Collisions: {}'.format(collision_count), True, (255, 255, 255))
    screen.blit(text, (10, 10))

    # Rafraîchir l'écran
    pygame.display.flip()


    # Mettre à jour l'angle des satellites
    for i in range(int(NUM_SATELLITES/2)):
        distance, angle, couleur = satellites[i]
        # Ajouter un petit angle à l'angle actuel pour faire tourner les satellites
        angle += 0.00002*i
        satellites[i] = (distance, angle,couleur)
    
    for i in range(int(NUM_SATELLITES/2),NUM_SATELLITES):
        distance, angle, couleur = satellites[i]
        # Ajouter un petit angle à l'angle actuel pour faire tourner les satellites
        angle -= 0.00002*i
        satellites[i] = (distance, angle,couleur)
    
    # Limiter la fréquence d'images
    clock.tick(60)

# Quitter Pygame
pygame.quit()


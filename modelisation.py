import pygame
import math
import random

# Définition des constantes
WIDTH = 1000
HEIGHT = 600
RADIUS = 150
CENTER = (int(WIDTH/2), int(HEIGHT/2))
NUM_SATELLITES = 400

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
    distance = random.uniform(RADIUS*1.2, RADIUS*1.95)
    # Générer un angle aléatoire en radians
    angle = random.uniform(0, 2*math.pi)
    satellites.append((distance, angle))


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
    pygame.draw.circle(screen, (0, 0, 0), CENTER, RADIUS, 2)
    
    # Dessiner les satellites
    for distance, angle in satellites:
        x = int(CENTER[0] + distance*math.cos(angle))
        y = int(CENTER[1] + distance*math.sin(angle))
        pygame.draw.circle(screen, (255, 255, 255), (x, y), 2)
    
    # Rafraîchir l'écran
    pygame.display.flip()
    
    # Mettre à jour l'angle des satellites
    for i in range(int(NUM_SATELLITES/2)):
        distance, angle = satellites[i]
        # Ajouter un petit angle à l'angle actuel pour faire tourner les satellites
        angle += 0.0002*i
        satellites[i] = (distance, angle)
    
    for i in range(int(NUM_SATELLITES/2),NUM_SATELLITES):
        distance, angle = satellites[i]
        # Ajouter un petit angle à l'angle actuel pour faire tourner les satellites
        angle -= 0.0002*i
        satellites[i] = (distance, angle)
    
    # Limiter la fréquence d'images
    clock.tick(60)

# Quitter Pygame
pygame.quit()


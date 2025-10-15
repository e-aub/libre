#!/bin/bash

BASE="src/main/java/com/libre"

# ===== CONFIG =====
mv controller/AdminController.java         $BASE/dashboard/controller/ 2>/dev/null
mv service/AdminService.java               $BASE/dashboard/service/ 2>/dev/null

# ===== AUTH =====
mv controller/AuthController.java          $BASE/auth/controller/ 2>/dev/null
mv service/AuthService.java                $BASE/auth/service/ 2>/dev/null
mv service/JwtService.java                 $BASE/auth/service/ 2>/dev/null
mv dto/LoginInput.java                     $BASE/auth/dto/ 2>/dev/null
mv dto/LoginRequest.java                   $BASE/auth/dto/ 2>/dev/null
mv dto/LoginResponse.java                  $BASE/auth/dto/ 2>/dev/null
mv dto/RegisterRequest.java                $BASE/auth/dto/ 2>/dev/null

# ===== USER =====
mv controller/UserController.java          $BASE/user/controller/ 2>/dev/null
mv service/UserService.java                $BASE/user/service/ 2>/dev/null
mv repository/UserRepository.java          $BASE/user/repository/ 2>/dev/null
mv model/User.java                         $BASE/user/model/ 2>/dev/null
mv model/Role.java                         $BASE/user/model/ 2>/dev/null
mv dto/UserDto.java                        $BASE/user/dto/ 2>/dev/null
mv validation/UserValidator.java           $BASE/user/validation/ 2>/dev/null

# ===== POST =====
mv controller/PostController.java          $BASE/post/controller/ 2>/dev/null
mv service/PostService.java                $BASE/post/service/ 2>/dev/null
mv repository/PostRepository.java          $BASE/post/repository/ 2>/dev/null
mv model/Post.java                         $BASE/post/model/ 2>/dev/null
mv dto/PostDto.java                        $BASE/post/dto/ 2>/dev/null

# ===== COMMENT =====
mv controller/CommentController.java       $BASE/comment/controller/ 2>/dev/null
mv service/CommentService.java             $BASE/comment/service/ 2>/dev/null
mv repository/CommentRepository.java       $BASE/comment/repository/ 2>/dev/null
mv model/Comment.java                      $BASE/comment/model/ 2>/dev/null
mv dto/CommentDto.java                     $BASE/comment/dto/ 2>/dev/null

# ===== NOTIFICATION =====
mv controller/NotificationController.java  $BASE/notification/controller/ 2>/dev/null
mv service/NotificationService.java        $BASE/notification/service/ 2>/dev/null
mv repository/NotificationRepository.java  $BASE/notification/repository/ 2>/dev/null
mv model/Notification.java                 $BASE/notification/model/ 2>/dev/null
mv dto/NotificationDto.java                $BASE/notification/dto/ 2>/dev/null

# ===== REPORT =====
mv controller/ReportController.java        $BASE/report/controller/ 2>/dev/null
mv service/ReportService.java              $BASE/report/service/ 2>/dev/null
mv repository/ReportRepository.java        $BASE/report/repository/ 2>/dev/null
mv model/Report.java                       $BASE/report/model/ 2>/dev/null
mv dto/ReportDto.java                      $BASE/report/dto/ 2>/dev/null

# ===== SUBSCRIPTION =====
mv service/SubscriptionService.java        $BASE/subscription/service/ 2>/dev/null
mv repository/SubscriptionRepository.java  $BASE/subscription/repository/ 2>/dev/null
mv model/Subscription.java                 $BASE/subscription/model/ 2>/dev/null

# ===== COMMON =====
mv exception/*.java                        $BASE/common/exception/ 2>/dev/null

echo "✅ Files moved into new feature-based structure."
echo "⚠️  Now open your IDE and let it auto-fix imports (or run mvn clean compile)."

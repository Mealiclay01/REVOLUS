from django.contrib import admin
from .models import AppUser
from django.contrib.auth.admin import UserAdmin

@admin.register(AppUser)
class AppUserAdmin(admin.ModelAdmin):
    list_display = ["email", "first_name", "last_name", "phone_number", "city", "is_active", "is_staff"]
    search_fields = ["email", "first_name", "last_name", "phone_number", "city"]
    list_filter = ["is_active", "is_staff"]
    ordering = ["email"]
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("first_name", "last_name", "phone_number", "city")}),
        ("Permissions", {"fields": ("is_active", "is_staff")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "password", "is_active", "is_staff"),
        }),
    )

# admin.site.register(AppUser, UserAdmin)

